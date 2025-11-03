
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvestorById } from "../../Redux/slices/investorSlice";

const InvestorProfile = () => {
  const dispatch = useDispatch();
  const investorId = 5;
  useEffect(() => {
    dispatch(fetchInvestorById(investorId));
  }, [dispatch, investorId]);

  const profile = useSelector((state) => state?.investors?.investorData);
  // console.log("Investor Data:", investorData);
  // const profile = {
  //   name: "Rahul Sharma",
  //   email: "rahul.sharma@example.com",
  //   contact: "+91 9876543210",
  //   branch: "Indore Main Branch",
  //   accountHolder: "Rahul Sharma",
  //   ifsc: "SBIN0001234",
  //   accountNumber: "123456789012",
  // };

  // Function to get first two initials
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    return words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex  items-center  bg-gray-50 p-4">
      <div className="bg-white shadow rounded-2xl p-6 md:p-10 w-full max-w-2xl transition hover:shadow-2xl duration-300">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          {/* <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-blue-600 text-white flex items-center justify-center text-3xl font-bold rounded-full shadow-lg">
              {profile?.name}
            </div>
          </div> */}

          {/* Profile Info */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {profile?.name}
            </h2>
            <p className="text-gray-500 mb-6">Investor Profile</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Email</p>
                <p className="text-gray-800">{profile?.email}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Contact</p>
                <p className="text-gray-800">{profile?.mobileNumber}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Branch Name</p>
                <p className="text-gray-800">{profile?.branchName}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">
                  Account Holder Name
                </p>
                <p className="text-gray-800">{profile?.accountHolderName}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">IFSC Code</p>
                <p className="text-gray-800">{profile?.ifscCode}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Account Number</p>
                <p className="text-gray-800">{profile?.accountNumber}</p>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default InvestorProfile;

