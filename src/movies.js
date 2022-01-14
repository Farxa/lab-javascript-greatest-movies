// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(arr) {
  const directors = arr.map(function(movie) {
    return movie.director;
  })
  // remove duplicates 
  return directors.filter((value, index) => directors.indexOf(value) === index);
  // another way to remove duplicates
  // set
  //const ar = [...new Set(directors)];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(arr) {
  const filteredMovies = arr.filter(function(el) {
    return el.director == 'Steven Spielberg' && el.genre.includes('Drama');
  })
  return filteredMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(arr) {
  const allScores = arr.map(function(el) {
    return el.score || 0; //<- if (movie.score === '' || movie.score === undefined){movie.score === 0}
  })

   const average = allScores.reduce(function(acc, val) {
    return Math.round((acc + val / arr.length) * 100) / 100;
  }, 0)
  return average;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(arr) {
  // get all movies that include the genre "Drama"
  const allDramas = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].genre.includes('Drama')) {
      allDramas.push(arr[i]);
    }
  }
  // get only the scores of those movies
    const allDramaScores = allDramas.map(function(el){
      return el.score;
    })
  // get the average score of all drama movies
  const avarageDrama = allDramaScores.reduce(function(accumulator, currentValue){
    return Math.round((accumulator + currentValue / allDramas.length) * 100) / 100;
  }, 0)
  return avarageDrama;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(arr) {
  //creat a new array to not mutate the original array
  const newMoviesArray = JSON.parse(JSON.stringify(arr));
  //return newMoviesArray

  // sort the movies in ascending order by their release year
  const sortedByYear = newMoviesArray.sort(function(a, b) {
    if (a.year !== b.year){
      return a.year - b.year;
    }
    if(a.year === b.year) {
      if (a.title < b.title) {
      return -1;
    }
      if (a.title > b.title) {
        return 1;
        // another way to do the previous: return a.title.localCompare(b.title);
      }
    }
    return sortedByYear;
  })
return newMoviesArray;
}


// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(arr) {
  //get only the title of each movie
    const allTitles = arr.map(function(el) {
      return el.title;
    })
    //console.log(allTitles)
    // get an array of first 20 titles, alphabetically ordered
    const allTitlesSorted = allTitles.sort(function(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
    })
    if (allTitlesSorted.length > 20) {
        return allTitlesSorted.slice(0, 20);
      }
    return allTitlesSorted;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
const turnHoursToMinutes = arr => arr.map(movie => {
  let convertedDuration = 0;
  if (movie.duration.includes('h')) {
      convertedDuration += Number(movie.duration.slice(0, movie.duration.indexOf('h'))) * 60;
  }
  if (movie.duration.includes('min')) {
      convertedDuration += Number(movie.duration.slice(movie.duration.indexOf(' ') + 1, movie.duration.indexOf('m')));
  }
  return ({...movie, duration: convertedDuration});       
})

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
const bestYearAvg = arr => {
  if (!arr.length) return null;

  const yearsWithRatedMovies = [...new Set(arr.map(movie => movie.year))];
  const averageRatingsPerYear = [];
  yearsWithRatedMovies.forEach(year => averageRatingsPerYear.push({year, rate: scoresAverage(arr.filter(movie => movie.year === year))}));
  
  const best = averageRatingsPerYear.sort((a, b) => b.rate - a.rate === 0 ? a.year - b.year : b.rate - a.rate)[0];
  
  return `The best year was ${best.year} with an average score of ${best.rate}`
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
