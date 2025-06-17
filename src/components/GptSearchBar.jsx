import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { getGeminiResponse } from "../utils/geminiService";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";
// import openai from "../utils/openai";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef("");

//  const handleGptSearchClick = async () => {
//   try {
    
//     const gptQuery = "Act as a Movie recommendation system and suggest some movies based for the query: " + searchText.current.value + ". only give 5 movie names, comma separated like the example result given ahead. Example  Result: It, The Godfather, The Dark Knight, Pulp Fiction, Fight Club";

//     const gptResults = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: gptQuery,
//         },
//       ],
//       model: "gpt-3.5-turbo",
//     });

//     console.log(gptResults.choices);
//   } catch (error) {
//     console.error("Error calling GPT API:", error);
//   }
// };

const searchMovieTMDB = async (movie) => {
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS);

  const json = await data.json();

  return json.results;
}

const handleSubmit = async (e) => {

    e.preventDefault();
    if(searchText.current.value.trim() === "") {
      alert("Please enter a search query."); 
      return
     }
    const prompt = `Act as a Movie recommendation system and suggest some movies based on the query: ${searchText.current.value}. Only give 5 movie names, comma separated like the example result given ahead. Example Result: It, The Godfather, The Dark Knight, Pulp Fiction, Fight Club`;
    try {
      const aiResponse = await getGeminiResponse(prompt);
      const generatedText = aiResponse.candidates[0].content.parts[0].text;
      const gptMovies = generatedText.split(',').map(movie => movie.trim());

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMovieResult({movieNames: gptMovies,movieResults: tmdbResults}));
      console.log(tmdbResults);
      
    } catch (error) {
      console.log("Error calling Gemini API:", error);
    }
  };
  
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12 rounded-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9 border-1 border-rounded text-white"
        />
        <button
          onClick={handleSubmit}
          className="col-span-3 m-4 cursor-pointer py-2 px-4 bg-red-700 text-white rounded-md"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
