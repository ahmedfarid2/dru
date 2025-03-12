'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dru/web-ui';
import { LuSearch, LuPlus, LuFilter } from 'react-icons/lu';

const products = [
  {
    id: '1',
    name: 'Product 1',
    category: 'Electronics',
    price: 299.99,
    stock: 45,
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '2',
    name: 'Product 2',
    category: 'Clothing',
    price: 49.99,
    stock: 100,
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '3',
    name: 'Product 3',
    category: 'Electronics',
    price: 199.99,
    stock: 30,
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '4',
    name: 'Product 4',
    category: 'Home',
    price: 79.99,
    stock: 65,
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '5',
    name: 'Product 5',
    category: 'Clothing',
    price: 39.99,
    stock: 85,
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '6',
    name: 'Product 6',
    category: 'Home',
    price: 129.99,
    stock: 25,
    image: 'https://via.placeholder.com/200',
  },
];

const categories = ['All', 'Electronics', 'Clothing', 'Home'];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Products</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <LuFilter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>
              <LuPlus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm ${
                        product.stock > 50
                          ? 'text-green-600'
                          : product.stock > 20
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
