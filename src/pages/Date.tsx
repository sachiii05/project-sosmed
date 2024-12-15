import { useState } from "react";
import CardComponent from "../components/Card/Card";
import Layout from "../layouts/layout";
import food1 from "../assets/img/food/food1.jpg";
import food2 from "../assets/img/food/food2.jpg";
import food3 from "../assets/img/food/food3.jpg";
import food4 from "../assets/img/food/food4.jpg";
import food5 from "../assets/img/food/food5.jpg";
import food6 from "../assets/img/food/food6.jpg";

import mov1 from "../assets/img/movies/img1.jpg";
import mov2 from "../assets/img/movies/img2.jpg";
import mov3 from "../assets/img/movies/img3.jpg";
import mov4 from "../assets/img/movies/img4.jpg";
import mov5 from "../assets/img/movies/img5.jpg";
import mov6 from "../assets/img/movies/img6.jpg";

import img1 from "../assets/img/cat-jump.gif";
import HeartButton from "../components/HeartButton/HeartButton";
import { pink } from "../components/interfaces/HeartButton.interface";
import HeartSlider from "../components/Heart/Heart";
import { useNavigate } from "react-router";

const Date = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "food"
  );
  const navigate = useNavigate();

  const handleCardClick = (index: number) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(
        selectedCards.filter((cardIndex) => cardIndex !== index)
      );
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const getTitle = () => {
    switch (selectedCategory) {
      case "food":
        return "What do you want to eat ?";
      case "movie":
        return "What movie do you want to watch ?";
      default:
    }
  };

  const nextQuestion = () => {
    if (selectedCategory === "rate") {
      // Save response to backend
      const response = {
        foodChoices: foodData.map((food, index) => ({
          title: food.title,
          selected: selectedCards.includes(index)
        })),
        movieChoices: movieData.map((movie, index) => ({
          title: movie.title,
          selected: selectedCards.includes(index)
        })),
        dateTime: JSON.parse(localStorage.getItem("dateTime") || "{}"),
        rating: (document.querySelector(".heart-slider") as HTMLInputElement)?.value || "0"
      };

      console.log('Sending data to backend:', response);

      fetch("http://localhost:5001/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Response saved successfully:', data);
          // Reset selections before navigating
          setSelectedCards([]);
          navigate("/thankyou");
        })
        .catch((error) => {
          console.error('Error saving response:', error);
          navigate("/thankyou");
        });
    } else {
      if (selectedCategory === "movie") {
        setSelectedCategory("rate");
      } else {
        // Save food selections and move to movies
        setSelectedCategory("movie");
      }
      // Don't reset selections when moving between food and movies
      if (selectedCategory === "rate") {
        setSelectedCards([]);
      }
    }
  };

  const foodData = [
    {
      title: "Pancake",
      image: food1,
    },
    {
      title: "Fried Rice",
      image: food2,
    },
    {
      title: "Salmon",
      image: food3,
    },
    {
      title: "Steak",
      image: food4,
    },
    {
      title: "Burger and Fries",
      image: food5,
    },
    {
      title: "Pizza",
      image: food6,
    },
  ];

  const movieData = [
    {
      title: "Kraven",
      image: mov1,
    },
    {
      title: "Betting with Ghost",
      image: mov2,
    },
    {
      title: "Christmas with the Chosen",
      image: mov3,
    },
    {
      title: "Moana 2",
      image: mov4,
    },
    {
      title: "Heretic",
      image: mov5,
    },
    {
      title: "Wicked",
      image: mov6,
    },
  ];

  return (
    <Layout>
      <h1 style={{ color: pink }}>{getTitle()}</h1>
      <main className="d-flex flex-wrap justify-content-center mt-3">
        {selectedCategory === "food" &&
          foodData.map((card, index) => (
            <div key={index} className="m-2">
              <CardComponent
                title={card.title}
                image={card.image}
                isSelected={selectedCards.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        {selectedCategory === "movie" &&
          movieData.map((card, index) => (
            <div key={index} className="m-2">
              <CardComponent
                title={card.title}
                image={card.image}
                isSelected={selectedCards.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        {selectedCategory === "rate" && (
          <>
            <div className="d-flex flex-column justify-content-center">
              <img
                className="m-auto"
                src={img1}
                alt="Image 1"
                style={{
                  width: "300px",
                  marginBottom: "20px",
                  borderRadius: "15px",
                }}
              />
              <h1 style={{ color: pink }} className="py-3">
                Rate how exited are you
              </h1>
            </div>
            <HeartSlider></HeartSlider>
          </>
        )}
      </main>
      <HeartButton
        style={{
          width: "100%",
          maxWidth: "300px",
          margin: "0 auto",
          marginTop: "2rem",
        }}
        text="Continue ⊂(・ヮ・⊂)"
        onClick={nextQuestion}
      />
    </Layout>
  );
};

export default Date;
