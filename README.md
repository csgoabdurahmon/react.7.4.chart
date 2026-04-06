# Nike Admin Panel (React + Vite)

Black/white theme admin panel with:

- Admin login page (`ADMIN` username)
- Product list + create + update + delete
- Order list + cancel + delivered
- Tailwind CSS UI
- Formik + Yup form validation

## API

Frontend dev server runs on `http://localhost:5567`.

Backend API base URL is configured with `VITE_API_BASE_URL` and defaults to `http://localhost:5555`.

Create a `.env` file if your backend runs on another port:

```bash
VITE_API_BASE_URL=http://localhost:5555
```

Required endpoints:

- `GET /products`
- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `GET /orders`
- `PATCH /orders/:id` (with `{ status }`)

## Product form fields

- `name`
- `size`
- `description`
- `photos` (comma-separated URLs)

## Run

```bash
npm install
npm run dev
```

## Login

- Username: `ADMIN`
- Password: any password with at least 4 characters
