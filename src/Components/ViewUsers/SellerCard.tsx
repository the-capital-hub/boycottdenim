import React, { useState } from "react";
import { MoreVertical, Check, X, Trash2 } from "lucide-react";

interface SellerCardProps {
  name: string;
  id: string;
  avatar: string;
  description?: string;
  showApprove?: boolean;
}

const SellerCard: React.FC<SellerCardProps> = ({
  name,
  id,
  avatar,
  description,
  showApprove,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-white p-4 rounded-xl border shadow-sm w-full max-w-md sm:max-w-sm mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Avatar */}
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />

        {/* Seller Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-500">{description || "Lorem ipsum dolor sit amet..."}</p>
          <p className="text-xs text-gray-400 mt-2 truncate">ID: {id}</p>
        </div>

        {/* Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-500 self-start sm:self-center"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md border z-10 w-36">
          <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
            <Trash2 size={14} /> Ban Seller
          </button>
          {showApprove && (
            <button className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
              <Check size={14} /> Approve
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerCard;
