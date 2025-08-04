"use client";
import React, { useState } from "react";

const AddProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "", // comma-separated string input
    gender: "",
    images: [""],
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm((prev) => ({ ...prev, images: updated }));
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.description.length < 32) {
      alert("Description must be at least 32 characters.");
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      gender: form.gender,
      description: form.description,
      images: form.images.filter((img) => img.trim() !== ""),
      categories: form.category.trim(),

    };

    try {
      const res = await fetch("/api/product/createProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Product added successfully!");
        console.log(data);
        setForm({
          name: "",
          price: "",
          stock: "",
          category: "",
          gender: "",
          images: [""],
          description: "",
        });
      } else {
        alert(`❌ ${data.message || "Failed to add product"}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Server error while adding product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block font-medium mb-2">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="Enter product name"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-2">Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="Enter price"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-2">Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="Enter available stock"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block font-medium mb-2">Categories</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="e.g. jeans, casual, slim-fit"
          />
          <p className="text-xs text-gray-500 mt-1">Separate multiple categories with commas</p>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-2">Image URLs</label>
          {form.images.map((img, i) => (
            <input
              key={i}
              value={img}
              onChange={(e) => handleImageChange(i, e.target.value)}
              className="w-full border p-2 rounded mb-2"
              placeholder={`Image URL ${i + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Add another image
          </button>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Product Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description (min 32 characters)"
            minLength={32}
            required
            className="w-full border p-3 rounded h-32 resize-none"
          />
          {form.description && form.description.length < 32 && (
            <p className="text-red-600 text-sm mt-1">Minimum 32 characters required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
