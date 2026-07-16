"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function FlightPage() {
  const params = useParams();
  const id = params?.id;

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getFlight = async () => {
      try {
        const res = await fetch("/api/flights");

        if (!res.ok) {
          throw new Error("Failed to fetch flights");
        }

        const data = await res.json();

        console.log(data);

        if (!Array.isArray(data)) {
          console.error("API did not return an array:", data);
          setLoading(false);
          return;
        }

        const foundFlight = data.find(
          (f) => String(f._id) === String(id)
        );

        if (foundFlight) {
          setFlight(foundFlight);
        } else {
          console.error("Flight not found");
        }

      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getFlight();
  }, [id]);


  const addToCart = () => {
    if (!flight) return;

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = existingCart.some(
      (item) => String(item._id) === String(flight._id)
    );

    if (!exists) {
      existingCart.push(flight);
      localStorage.setItem(
        "cart",
        JSON.stringify(existingCart)
      );

      alert(`Flight to ${flight.to} added to your cart! 🛒`);
    } else {
      alert(`Flight to ${flight.to} is already in your cart!`);
    }
  };


  const addToFavourites = () => {
    if (!flight) return;

    const existingFavs =
      JSON.parse(localStorage.getItem("favourites")) || [];

    const exists = existingFavs.some(
      (item) => String(item._id) === String(flight._id)
    );

    if (!exists) {
      existingFavs.push(flight);

      localStorage.setItem(
        "favourites",
        JSON.stringify(existingFavs)
      );

      alert(`Flight to ${flight.to} added to your favorites! ❤️`);
    } else {
      alert(`Flight to ${flight.to} is already in your favorites!`);
    }
  };


  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }


  if (!flight) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Flight not found 🔍
      </div>
    );
  }


  return (
    <div id="box" style={{ direction: "ltr" }}>

      <div className="menu">

        <Link href="/">
          <img
            src="/image/logos/logo.png"
            className="logo"
            alt="logo"
          />
        </Link>


        <div className="options">

          <Link href="/flights" className="button">
            טיסות
          </Link>


          <Link href="/cart" className="basket">
            <img
              src="/image/logos/icons8-shopping-cart-50.png"
              alt="cart"
            />
          </Link>


          <Link href="/favourites" className="favourites">
            <img
              src="/image/logos/icons8-heart-50.png"
              alt="heart"
            />
          </Link>

        </div>

      </div>



      <div
        style={{
          padding: "40px 20px",
          maxWidth: "800px",
          margin: "40px auto",
          fontFamily: "sans-serif",
        }}
      >

        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            color: "#333",
            textAlign: "left",
          }}
        >

          <h1
            style={{
              borderBottom: "2px solid #eee",
              paddingBottom: "15px",
              color: "#2c3e50",
              fontSize: "28px",
            }}
          >
            Flight Details to {flight.to}
          </h1>



          <div
            style={{
              marginTop: "20px",
              fontSize: "18px",
              lineHeight: "2",
            }}
          >

            <p>
              ✈️ <strong>Airline:</strong>{" "}
              {flight.airline || flight.Airline}
            </p>


            <p>
              ⏰ <strong>Flight Times:</strong>{" "}
              {flight.time}
            </p>


            <p>
              🏷️ <strong>Deal Type:</strong>{" "}
              {flight.category}
            </p>


            <p
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#27ae60",
                marginTop: "15px",
              }}
            >
              Total Price: ₪{flight.price}
            </p>



            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >


              <Link
                href={`/checkout?id=${flight._id}`}
                style={{
                  background: "#27ae60",
                  color: "white",
                  padding: "12px 25px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Proceed to Checkout ➜
              </Link>



              <button
                onClick={addToCart}
                style={{
                  background: "#3498db",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>



              <button
                onClick={addToFavourites}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Favorite ❤️
              </button>


            </div>

          </div>

        </div>

      </div>

    </div>
  );
}