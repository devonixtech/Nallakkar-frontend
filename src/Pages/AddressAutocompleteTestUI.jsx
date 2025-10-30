 import React, { useEffect, useRef, useState } from "react";

// AddressAutocompleteTestUI.jsx
// Single-file React component to test Google Places Autocomplete + structured address
// - Replace REPLACE_WITH_YOUR_API_KEY with your Google API Key
// - Drop into a CRA / Vite React project and render <AddressAutocompleteTestUI />

export default function AddressAutocompleteTestUI() {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [place, setPlace] = useState(null);
  const [address, setAddress] = useState({
    fullAddress: "",
    line1: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    lat: null,
    lng: null,
  });

  const [sending, setSending] = useState(false);
  const [responseText, setResponseText] = useState("");

  // Load Google Maps script dynamically (Places library)
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setLoaded(true);
      return;
    }

    const existing = document.getElementById("gmaps-script");
    if (existing) {
      existing.onload = () => setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "gmaps-script";
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=REPLACE_WITH_YOUR_API_KEY&libraries=places";
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("Failed to load Google Maps script");
    document.body.appendChild(script);

    return () => {
      // optional cleanup
    };
  }, []);

  // Initialize Autocomplete when script loaded
  useEffect(() => {
    if (!loaded) return;
    if (!inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "in" }, // change as needed
      }
    );

    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
      "geometry",
    ]);

    autocompleteRef.current.addListener("place_changed", () => {
      const p = autocompleteRef.current.getPlace();
      setPlace(p);
      const parsed = parseAddressComponents(p);
      setAddress(parsed);
    });
  }, [loaded]);

  function parseAddressComponents(p) {
    const addr = {
      fullAddress: p.formatted_address || "",
      line1: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      lat: p.geometry?.location?.lat?.() || null,
      lng: p.geometry?.location?.lng?.() || null,
    };

    (p.address_components || []).forEach((c) => {
      const types = c.types || [];
      if (types.includes("street_number")) addr.line1 = c.long_name + " " + addr.line1;
      if (types.includes("route")) addr.line1 = (addr.line1 + c.long_name).trim();
      if (types.includes("sublocality") || types.includes("sublocality_level_1")) {
        if (!addr.line1) addr.line1 = c.long_name;
      }
      if (types.includes("locality")) addr.city = c.long_name;
      if (types.includes("administrative_area_level_2") && !addr.city) addr.city = c.long_name;
      if (types.includes("administrative_area_level_1")) addr.state = c.long_name;
      if (types.includes("country")) addr.country = c.long_name;
      if (types.includes("postal_code")) addr.pincode = c.long_name;
    });

    return addr;
  }

  // Build Shiprocket payload from address + sample order data
  function buildShiprocketPayload() {
    return {
      order_id: `TEST-${Date.now()}`,
      order_date: new Date().toISOString().slice(0, 10),
      pickup_location: "Default Pickup",
      billing_customer_name: "Test Customer",
      billing_address: address.line1 || address.fullAddress,
      billing_city: address.city || "",
      billing_state: address.state || "",
      billing_country: address.country || "",
      billing_pincode: address.pincode || "",
      billing_email: "customer@example.com",
      billing_phone: "9999999999",
      order_items: [
        { name: "Test Product", sku: "TP-001", units: 1, selling_price: "100" },
      ],
      payment_method: "Prepaid",
      shipping_is_billing: true,
    };
  }

  // Send payload to your backend (example endpoint: /api/shiprocket/create-order)
  async function sendToShiprocket() {
    setResponseText("");
    setSending(true);
    const payload = buildShiprocketPayload();

    try {
      // Replace with your actual backend route that calls Shiprocket
      const res = await fetch("/api/shiprocket/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponseText(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponseText(String(err));
    } finally {
      setSending(false);
    }
  }

  // Helper: simulate server response without real backend
  function fakeServerResponse() {
    const payload = buildShiprocketPayload();
    setResponseText(JSON.stringify({ ok: true, payload }, null, 2));
  }
async function getCurrentLocation() {
  if (!navigator.geolocation) {
    alert("Location is not supported in this browser!");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;

      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=REPLACE_WITH_YOUR_API_KEY`;

      try {
        const res = await fetch(geocodeURL);
        const data = await res.json();

        if (data?.results?.[0]) {
          const p = data.results[0];
          const parsed = parseAddressComponents(p);
          setAddress(parsed);
          setPlace(p);
          if (inputRef.current) {
            inputRef.current.value = p.formatted_address;
          }
        }
      } catch (err) {
        console.error(err);
        alert("Failed to get address from location!");
      }
    },
    (error) => {
      alert("Location access denied!");
      console.error(error);
    }
  );
}

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Address Autocomplete Test UI</h2>
      <button
  onClick={getCurrentLocation}
  className="px-4 py-2 rounded bg-green-600 text-white"
>
  Use Current Location
</button>


      <label className="block text-sm font-medium mb-2">Search address</label>
      <input
        ref={inputRef}
        placeholder="Start typing address..."
        className="w-full p-3 border rounded mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-medium mb-2">Parsed address</h3>
          <div className="text-sm space-y-1">
            <div><strong>Full:</strong> {address.fullAddress || "-"}</div>
            <div><strong>Line1:</strong> {address.line1 || "-"}</div>
            <div><strong>City:</strong> {address.city || "-"}</div>
            <div><strong>State:</strong> {address.state || "-"}</div>
            <div><strong>Country:</strong> {address.country || "-"}</div>
            <div><strong>Pincode:</strong> {address.pincode || "-"}</div>
            <div><strong>Lat,Lng:</strong> {address.lat ? `${address.lat}, ${address.lng}` : "-"}</div>
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-medium mb-2">Shiprocket payload preview</h3>
          <pre className="text-xs overflow-auto max-h-48 bg-gray-50 p-2 rounded">
            {JSON.stringify(buildShiprocketPayload(), null, 2)}
          </pre>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={sendToShiprocket}
          disabled={sending}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send to Shiprocket (POST /api/shiprocket/create-order)"}
        </button>

        <button
          onClick={fakeServerResponse}
          className="px-4 py-2 rounded border"
        >
          Simulate Server Response
        </button>

        <button
          onClick={() => {
            setAddress({
              fullAddress: "",
              line1: "",
              city: "",
              state: "",
              country: "",
              pincode: "",
              lat: null,
              lng: null,
            });
            setResponseText("");
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="px-4 py-2 rounded border"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 p-4 border rounded">
        <h3 className="font-medium mb-2">Server response</h3>
        <pre className="text-sm max-h-64 overflow-auto bg-gray-50 p-2 rounded">{responseText || "No response yet"}</pre>
      </div>

      <div className="mt-4 text-xs text-gray-600">
        <p>Notes:</p>
        <ul className="list-disc ml-5">
          <li>Replace <code>REPLACE_WITH_YOUR_API_KEY</code> in the script URL with your Google API key.</li>
          <li>Set up a backend endpoint <code>/api/shiprocket/create-order</code> that takes the JSON and calls Shiprocket APIs.</li>
          <li>For local testing, you can use <code>fakeServerResponse</code> to see the payload format.</li>
        </ul>
      </div>
    </div>
  );
}
