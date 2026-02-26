import React from "react";
import { Container } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

const RADIAN = Math.PI / 175;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ProductChart = ({ products, review, cart, wishlist, paymentData }) => {
  const productData = [
    { name: "Cloths", Quantity: products.filter(p => p.type === "cloths").length },
    { name: "Shoes", Quantity: products.filter(p => p.type === "shoe").length },
    { name: "Electronics", Quantity: products.filter(p => p.type === "electronics").length },
    { name: "Books", Quantity: products.filter(p => p.type === "book").length },
    { name: "Jewelry", Quantity: products.filter(p => p.type === "jewelry").length },
  ];

  const reviewData = [
    { name: "One ⭐", Reviews: review.filter(r => Math.round(r.rating) === 1).length },
    { name: "Two ⭐", Reviews: review.filter(r => Math.round(r.rating) === 2).length },
    { name: "Three ⭐", Reviews: review.filter(r => Math.round(r.rating) === 3).length },
    { name: "Four ⭐", Reviews: review.filter(r => Math.round(r.rating) === 4).length },
    { name: "Five ⭐", Reviews: review.filter(r => Math.round(r.rating) === 5).length },
  ];

  const cartData = [
    { name: "Cloths", "Quantity in cart": cart.filter(c => c.productId.type === "cloths").length },
    { name: "Shoes", "Quantity in cart": cart.filter(c => c.productId.type === "shoe").length },
    { name: "Electronics", "Quantity in cart": cart.filter(c => c.productId.type === "electronics").length },
    { name: "Books", "Quantity in cart": cart.filter(c => c.productId.type === "book").length },
    { name: "Jewelry", "Quantity in cart": cart.filter(c => c.productId.type === "jewelry").length },
  ];

  const wishlistData = [
    { name: "Cloths", "Quantity in wishlist": wishlist.filter(w => w.productId.type === "cloths").length },
    { name: "Shoes", "Quantity in wishlist": wishlist.filter(w => w.productId.type === "shoe").length },
    { name: "Electronics", "Quantity in wishlist": wishlist.filter(w => w.productId.type === "electronics").length },
    { name: "Books", "Quantity in wishlist": wishlist.filter(w => w.productId.type === "book").length },
    { name: "Jewelry", "Quantity in wishlist": wishlist.filter(w => w.productId.type === "jewelry").length },
  ];

  const groupedData = paymentData
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .reduce((acc, item) => {
      const month = item.createdAt.substr(0, 7);
      const found = acc.find(el => el.month === month);
      if (found) found.totalAmount += item.totalAmount;
      else acc.push({ month, totalAmount: item.totalAmount });
      return acc;
    }, []);

  const formatXAxis = tick =>
    new Date(tick).toLocaleString("default", { month: "short" });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <Container sx={{ mt: 5 }}>
      {/* PAYMENT */}
      <h3 style={{ textAlign: "center", color: "#9932CC" }}>Payment</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#9932CC"
              fill="#9932CC"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PRODUCTS */}
      <h3 style={{ textAlign: "center", color: "#8884d8" }}>Products</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CART */}
      <h3 style={{ textAlign: "center", color: "#17becf" }}>Users Cart</h3>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip />
            <Pie
              data={cartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              dataKey="Quantity in cart"
            >
              {cartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* WISHLIST */}
      <h3 style={{ textAlign: "center", color: "#e377c2" }}>Users Wishlist</h3>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={wishlistData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Quantity in wishlist" fill="#e377c2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* REVIEWS */}
      <h3 style={{ textAlign: "center", color: "#83a6ed" }}>Reviews</h3>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={reviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Reviews" fill="#83a6ed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default ProductChart;
