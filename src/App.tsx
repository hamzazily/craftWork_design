import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { StoreProvider } from '@/context/StoreProvider'
import About from '@/pages/About'
import Browse from '@/pages/Browse'
import Cart from '@/pages/Cart'
import Home from '@/pages/Home'
import Licensing from '@/pages/Licensing'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Pro from '@/pages/Pro'
import Product from '@/pages/Product'
import Sell from '@/pages/Sell'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="product/:slug" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pro" element={<Pro />} />
            <Route path="sell" element={<Sell />} />
            <Route path="login" element={<Login />} />
            <Route path="licensing" element={<Licensing />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
