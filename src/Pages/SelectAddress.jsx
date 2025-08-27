import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SelectAddress() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const addresses = [
    {
      name: "Naveena",
      phone: "6360********",
      address:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt consetetur sadipscing elitr, eirmod tempor invidunt consetetur sadips",
    },
    {
      name: "Sumedha",
      phone: "6360********",
      address:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt consetetur sadipscing elitr,",
    },
    {
      name: "Bhoomika",
      phone: "6360********",
      address:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt consetetur sadipscing elitr,",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 lg:pb-8 pb-24">
      {/* Header */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 mb-6"
      >
        <FaArrowLeft className="text-lg cursor-pointer" />
        <h2 className="text-xl font-bold">SELECT DELIVERY ADDRESS</h2>
      </div>

      {/* Address List */}
      <div className="space-y-4 border">
        {addresses.map((addr, index) => (
          <div
            key={index}
            className={` p-4 shadow-sm relative ${
              selected === index ? "border-rose" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between">
              {/* Radio Button + Name + Phone */}
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={selected === index}
                  onChange={() => setSelected(index)}
                  className="mt-1 bg-rose"
                />
                <div>
                  <h3 className="font-semibold">
                    {addr.name}{" "}
                    <span className="ml-4 text-gray-700">{addr.phone}</span>
                  </h3>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
              </div>

              {/* Edit button (only for selected) */}
              {selected === index && (
                <Link
                  to={"/AddDeliveryAddress"}
                  className="text-rose font-semibold"
                >
                  Edit
                </Link>
              )}
            </div>

            {/* Deliver Here Button (only for selected address) */}
            {selected === index && (
              <Link
                to={"/ProductOverview"}
                className="inline-block mt-4 bg-primary hover:bg-rose text-white px-4 py-2"
              >
                Deliver Here
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Add new address */}
      <div className="mt-8">
        <Link
          to={"/AddDeliveryAddress"}
          className="w-[50%] bg-primary hover:bg-rose text-white py-3 px-3 shadow-md"
        >
          ADD DELIVERY ADDRESS
        </Link>
      </div>
    </div>
  );
}
