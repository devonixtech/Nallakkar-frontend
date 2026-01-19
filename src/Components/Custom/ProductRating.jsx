import React from "react";
import { FaStar } from "react-icons/fa";

const ProductRating = ({ rating, reviewCount, size = "sm", showCount = true }) => {
    const avgRating = parseFloat(rating) || 0;
    const count = parseInt(reviewCount) || 0;

    const sizeClasses = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
    };

    const iconSizes = {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16
    };

    // Don't show anything if there are no reviews
    if (count === 0 && avgRating === 0) {
        return (
            <div className={`flex items-center gap-1 ${sizeClasses[size]} text-gray-400`}>
                <FaStar size={iconSizes[size]} />
                <span>No reviews yet</span>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
            <FaStar className="text-yellow-400" size={iconSizes[size]} />
            <span className="font-semibold text-gray-800">
                {avgRating.toFixed(1)}
            </span>
            {showCount && count > 0 && (
                <>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">{count}</span>
                </>
            )}
        </div>
    );
};

export default ProductRating;
