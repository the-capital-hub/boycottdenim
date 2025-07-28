import React, { useState } from "react";
import { MoreVertical, Check, X, Trash2 } from "lucide-react";

interface SellerCardProps {
  name: string;
  id: string;
  avatar: string;
  description?: string;
  showApprove?: boolean;
}

const SellerCard: React.FC<SellerCardProps> = ({ name, id, avatar, description, showApprove }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-white p-4 rounded-xl border shadow-sm w-full max-w-sm">
      <div className="flex items-start gap-4">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{description || "Lorem ipsum dolor sit amet..."}</p>
          <p className="text-xs text-gray-400 mt-2">ID: {id}</p>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-500">
          <MoreVertical size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-14 right-4 bg-white shadow-lg rounded-md border z-10 w-36">
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
