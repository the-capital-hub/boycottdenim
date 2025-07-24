"use client";
import React, { useState } from "react";

const AddProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    category: "",
    gender: "",
    size: [] as string[],
    color: "",
    images: [""],
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleSizeChange = (size: string) => {
    setForm((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.description.length < 32) {
      alert("Description must be at least 32 characters.");
      return;
    }

    try {
      const res = await fetch("/api/product/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Product added:", data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
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

        {/* Discount */}
        <div>
          <label className="block font-medium mb-2">Discount (%)</label>
          <input
            name="discount"
            type="number"
            value={form.discount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Optional"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. ankle-fit, slim-fit"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block font-medium mb-2">Size</label>
          <div className="flex gap-3">
            {["30", "32", "34", "36"].map((s) => (
              <label key={s} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={form.size.includes(s)}
                  onChange={() => handleSizeChange(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block font-medium mb-2">Color</label>
          <input
            name="color"
            value={form.color}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. black, blue"
          />
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
