// ResultsPage.tsx
import { useEffect, useState } from "react";
import "./Result.css";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PRODUCTS_API =
  "https://jeval.com.au/collections/hair-care/products.json?page=1";

export default function ResultsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });
  const navigate = useNavigate();

  const answers = localStorage.getItem("userAnswers");
  const parsedAnswers = answers ? JSON.parse(answers) : [];
  console.log("User Answersss:", answers ? JSON.parse(answers) : []);

  if (!parsedAnswers) return;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(PRODUCTS_API);
        const data = await res.json();

        const items = data?.products || [];

        const filtered = items.filter((product: any) => {
          const content = (
            product.title +
            product.body_html +
            product.tags.join(" ")
          ).toLowerCase();

          return parsedAnswers.some((answer: any) =>
            content.includes(answer.toLowerCase())
          );
        });

        const sorted = [
          ...filtered.filter((p: any) => wishlist.includes(p.id.toString())),
          ...filtered.filter((p: any) => !wishlist.includes(p.id.toString())),
        ];

        setProducts(sorted);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, [parsedAnswers, wishlist]);

  const toggleWishlist = (id: string) => {
    let updated = [...wishlist];
    if (wishlist.includes(id)) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleClick = () => {
    navigate("/quiz");
  };

  return (
    <div className="results-container">
      <div className="results">
        <div className="results-overlay">
          <h1 className="results-title">
            Build you everyday self
            <br />
            care routine.
          </h1>
          <p className="results-subtitle">
            Perfect for if you're looking for soft, nourished skin, our
            moisturizing body washes are made with skin-natural nutrients that
            work with your skin to replenish moisture. With a light formula, the
            bubbly lather leaves your skin feeling cleansed and cared for. And
            by choosing relaxing fragrances you can add a moment of calm to the
            end of your day.
          </p>
          <button className="results-button" onClick={handleClick}>
            Retake the quiz
          </button>
        </div>
      </div>
      <div className="slider-wrapper">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={3}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          className="product-slider"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide className="product-card product-content">
            <h3 className="product-content-title">Daily routine</h3>
            <p className="product-content-description">
              Perfect for if you're looking for soft, nourished skin, our
              moisturizing body washes are made with skin-natural nutrients that
              work with your skin to replenish moisture. With a light formula,
              the bubbly lather leaves your skin feeling cleansed and cared for.
              And by choosing relaxing fragrances you can add a moment of calm
              to the end of your day.
            </p>
          </SwiperSlide>
          {products.map((product) => (
            <SwiperSlide className="product-card" key={product.id}>
              <img
                src={product.images[0]?.src}
                alt={product.title}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.variants[0]?.price}</p>
              </div>
              <button
                className={`wishlist-button ${
                  wishlist.includes(product.id.toString()) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(product.id.toString())}
              >
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6875 1.75 10.8125C1.1 9.93749 0.645833 9.13333 0.3875 8.39999C0.129167 7.66666 0 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.8708 7.66666 19.6125 8.39999C19.3542 9.13333 18.9 9.93749 18.25 10.8125C17.6 11.6875 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19ZM10 16.3C11.6 14.8667 12.9167 13.6375 13.95 12.6125C14.9833 11.5875 15.8 10.6958 16.4 9.93749C17 9.17916 17.4167 8.50416 17.65 7.91249C17.8833 7.32083 18 6.73333 18 6.14999C18 5.14999 17.6667 4.31666 17 3.64999C16.3333 2.98333 15.5 2.64999 14.5 2.64999C13.7167 2.64999 12.9917 2.87083 12.325 3.31249C11.6583 3.75416 11.2 4.31666 10.95 4.99999H9.05C8.8 4.31666 8.34167 3.75416 7.675 3.31249C7.00833 2.87083 6.28333 2.64999 5.5 2.64999C4.5 2.64999 3.66667 2.98333 3 3.64999C2.33333 4.31666 2 5.14999 2 6.14999C2 6.73333 2.11667 7.32083 2.35 7.91249C2.58333 8.50416 3 9.17916 3.6 9.93749C4.2 10.6958 5.01667 11.5875 6.05 12.6125C7.08333 13.6375 8.4 14.8667 10 16.3Z"
                    fill="#1C2635"
                  />
                </svg>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
