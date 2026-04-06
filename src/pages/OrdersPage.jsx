import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2'
import { getOrders, updateOrderStatus } from '../service/order.service'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const statusClassMap = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  cancelled: 'border-red-200 bg-red-50 text-red-700',
  delivered: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}
// bu funksiya bitta order ni umumiy summasini hisoblaydi
const getOrderTotal = (order) => {
  const directTotal = Number(order?.total)
  if (Number.isFinite(directTotal) && directTotal >= 0) {
    return directTotal
  }

  if (Array.isArray(order?.items)) {
    return order.items.reduce((sum, item) => {
      const itemPrice = Number(item?.price) || 0
      const quantity = Number(item?.quantity) || 1
      return sum + itemPrice * quantity
    }, 0)
  }

  return 0
}

const formatUsd = (value) => `$${Number(value || 0).toFixed(2)}`

const getSafeItems = (order) => (Array.isArray(order?.items) ? order.items : [])

const getOrderStatus = (order) => String(order?.status || 'pending').toLowerCase()

// order sahifa buyurtma loading larni saqlaydigon funksiya

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => getOrderStatus(order) === 'pending').length 
  const pendingAmount = orders.reduce((sum, order) => {
    return getOrderStatus(order) === 'pending' ? sum + getOrderTotal(order) : sum
  }, 0)
  const deliveredAmount = orders.reduce((sum, order) => {
    return getOrderStatus(order) === 'delivered' ? sum + getOrderTotal(order) : sum
  }, 0)
    
 // order larni olib keluvhi funklsiya
  const fetchOrders = useCallback(async (withLoader = true) => {
    try {
      setError('')
      if (withLoader) {
        setLoading(true)
      }
      const data = await getOrders()
      setOrders(Array.isArray(data) ? data : [])
    } catch {
      setError('Orderlarni olishda xatolik. Backendni tekshiring.')
    } finally {
      if (withLoader) {
        setLoading(false)
      }
    }
  }, [])

  // har 5 sekunda order ni yangilaydigon funksiya
  useEffect(() => {
    fetchOrders()

    const intervalId = setInterval(() => {
      fetchOrders(false)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [fetchOrders])

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status)
      await fetchOrders()
    } catch {
      setError('Order status yangilashda xatolik bo‘ldi.')
    }
  }
//satus boyicha sanab beruvchi buyurma funsiyasi
  const statusCounts = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        const status = getOrderStatus(order)
        if (status === 'delivered') acc.delivered += 1
        else if (status === 'cancelled') acc.cancelled += 1
        else acc.pending += 1
        return acc
      },
      { pending: 0, delivered: 0, cancelled: 0 },
    )
  }, [orders])

// har. bir buyurtma nechi marta buyurtma qilganini sanab beradi  
  const productQuantityMap = useMemo(() => {
    const map = new Map()
    orders.forEach((order) => {
      getSafeItems(order).forEach((item) => {
        const name = item?.name || 'Unknown Product'
        const quantity = Number(item?.quantity) || 1
        map.set(name, (map.get(name) || 0) + quantity)
      })
    })
    return map
  }, [orders])


  // top productlar
  const topProducts = useMemo(() => {
    return Array.from(productQuantityMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }, [productQuantityMap])

  // qaysi product qachon buyurtma ilganini korsatadi
  const revenueByDate = useMemo(() => {
    const map = new Map()
    orders.forEach((order) => {
      const rawDate = order.createdAt || order.updatedAt || new Date().toISOString()
      const dateKey = new Date(rawDate).toISOString().slice(0, 10)
      map.set(dateKey, (map.get(dateKey) || 0) + getOrderTotal(order))
    })
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [orders])

// money ni hisoblash bpyicha funk
  
  const revenueByStatus = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        const status = getOrderStatus(order)
        const total = getOrderTotal(order)
        if (status === 'delivered') acc.delivered += total
        else if (status === 'cancelled') acc.cancelled += total
        else acc.pending += total
        return acc
      },
      { pending: 0, delivered: 0, cancelled: 0 },
    )
  }, [orders])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const statusChartData = {
    labels: ['Pending', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [statusCounts.pending, statusCounts.delivered, statusCounts.cancelled],
        backgroundColor: ['#f59e0b', '#10b981', '#ef4444'],
        borderWidth: 0,
      },
    ],
  }

  const topProductsChartData = {
    labels: topProducts.map(([name]) => name),
    datasets: [
      {
        label: 'Quantity',
        data: topProducts.map(([, quantity]) => quantity),
        backgroundColor: '#3b82f6',
        borderRadius: 8,
      },
    ],
  }

  const revenueLineData = {
    labels: revenueByDate.map(([date]) => date),
    datasets: [
      {
        label: 'Revenue',
        data: revenueByDate.map(([, total]) => total),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.35,
        fill: true,
      },
    ],
  }

  const revenueStatusChartData = {
    labels: ['Pending Amount', 'Delivered Amount', 'Cancelled Amount'],
    datasets: [
      {
        data: [revenueByStatus.pending, revenueByStatus.delivered, revenueByStatus.cancelled],
        backgroundColor: ['#fbbf24', '#34d399', '#f87171'],
        borderWidth: 0,
      },
    ],
  }

  if (loading) {
    return <p className="text-zinc-600">Loading orders...</p>
  }

  return (
    <section className="space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Orders</p>
        <h1 className="text-3xl font-bold tracking-tight">Order List • Cancel • Delivered</h1>
      </div>

      {error ? (
        <p className="p-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">{error}</p>
      ) : null}

      <div className="grid gap-3 md:grid-cols-4">
        <article className="p-4 bg-white border shadow-sm rounded-xl border-zinc-200">
          <p className="text-xs tracking-wide uppercase text-zinc-500">Total Orders</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">{totalOrders}</p>
        </article>
        <article className="p-4 bg-white border shadow-sm rounded-xl border-zinc-200">
          <p className="text-xs tracking-wide uppercase text-zinc-500">Pending Orders</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{pendingOrders}</p>
        </article>
        <article className="p-4 bg-white border shadow-sm rounded-xl border-zinc-200">
          <p className="text-xs tracking-wide uppercase text-zinc-500">Pending Amount</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">{formatUsd(pendingAmount)}</p>
        </article>
        <article className="p-4 bg-white border shadow-sm rounded-xl border-zinc-200">
          <p className="text-xs tracking-wide uppercase text-zinc-500">Delivered Revenue</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{formatUsd(deliveredAmount)}</p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="p-5 bg-white border shadow-sm rounded-2xl border-zinc-200">
          <p className="mb-3 text-sm font-semibold text-zinc-700">Orders by Status</p>
          <div className="h-72">
            <Doughnut data={statusChartData} options={chartOptions} />
          </div>
        </article>

        <article className="p-5 bg-white border shadow-sm rounded-2xl border-zinc-200">
          <p className="mb-3 text-sm font-semibold text-zinc-700">Top Ordered Products</p>
          <div className="h-72">
            <Bar data={topProductsChartData} options={chartOptions} />
          </div>
        </article>

        <article className="p-5 bg-white border shadow-sm rounded-2xl border-zinc-200">
          <p className="mb-3 text-sm font-semibold text-zinc-700">Revenue Timeline</p>
          <div className="h-72">
            <Line data={revenueLineData} options={chartOptions} />
          </div>
        </article>

        <article className="p-5 bg-white border shadow-sm rounded-2xl border-zinc-200">
          <p className="mb-3 text-sm font-semibold text-zinc-700">Revenue by Status</p>
          <div className="h-72">
            <Pie data={revenueStatusChartData} options={chartOptions} />
          </div>
        </article>
      </div>

      {orders.length === 0 ? (
        <div className="p-6 bg-white border shadow-sm rounded-2xl border-zinc-200 text-zinc-500">Order yo‘q</div>
      ) : (
        <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-zinc-200">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-100/70">
              <tr className="text-xs tracking-wider text-left uppercase text-zinc-500">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-zinc-100 text-zinc-800">
              {orders.map((order) => {
                const orderStatus = getOrderStatus(order)

                return (
                  <tr key={order.id}>
                    <td className="px-4 py-3 text-sm">#{order.id}</td>
                    <td className="px-4 py-3 text-sm">{order.customerName || 'Unknown'}</td>
                    <td className="px-4 py-3 text-sm">
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <p key={`${order.id}-item-${index}`} className="text-xs text-zinc-700">
                              {item.name || 'Product'} x{item.quantity || 1}
                            </p>
                          ))}
                          {order.items.length > 2 ? (
                            <p className="text-xs text-zinc-500">+{order.items.length - 2} more</p>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500">No items</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{formatUsd(getOrderTotal(order))}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-md border px-2 py-1 text-xs font-semibold ${statusClassMap[orderStatus] || ''}`}
                      >
                        {orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          className="cursor-pointer rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-red-700 transition-colors hover:border-red-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                          className="cursor-pointer rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700 transition-colors hover:border-emerald-300"
                        >
                          Delivered
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default OrdersPage