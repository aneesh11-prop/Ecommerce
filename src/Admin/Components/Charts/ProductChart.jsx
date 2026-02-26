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
  AreaChart,
  Area,
} from "recharts";

const RADIAN = Math.PI / 180;

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

const ProductChart = ({
  products = [],
  review = [],
  cart = [],
  wishlist = [],
  paymentData = [],
}) => {
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
    { name: "Cloths", value: cart.filter(c => c.productId?.type === "cloths").length },
    { name: "Shoes", value: cart.filter(c => c.productId?.type === "shoe").length },
    { name: "Electronics", value: cart.filter(c => c.productId?.type === "electronics").length },
    { name: "Books", value: cart.filter(c => c.productId?.type === "book").length },
    { name: "Jewelry", value: cart.filter(c => c.productId?.type === "jewelry").length },
  ];

  const groupedData = [...paymentData]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .reduce((acc, item) => {
      const month = item.createdAt.slice(0, 7);
      const found = acc.find(m => m.month === month);
      if (found) found.total += item.totalAmount;
      else acc.push({ month, total: item.totalAmount });
      return acc;
    }, []);

  return (
    <Container sx={{ mt: 5 }}>
      {/* Revenue Trend */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area dataKey="total" fill="#8884d8" stroke="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Products */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cart Distribution */}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={cartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label={renderCustomizedLabel}
            >
              {cartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"][i]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Reviews */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={reviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Reviews" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default ProductChart;
