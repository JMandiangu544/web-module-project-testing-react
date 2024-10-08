import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Episode from "../Episode";

// Example episode data
const exampleEpisodeData = {
  airdate: "2016-07-15",
  airstamp: "2016-07-15T12:00:00+00:00",
  airtime: "",
  id: 553946,
  image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
  name: "Chapter One: The Vanishing of Will Byers",
  number: 1,
  rating: { average: 8.2 },
  runtime: 49,
  season: 1,
  summary: "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
  type: "regular",
  url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
}

describe('Episode component', () => {
  test("renders without error", () => {
    // Render the component passing episode data
    render(<Episode episode={exampleEpisodeData} />);
    
    // Print the simulated DOM
    screen.debug();
  });

  test("renders texts and alt texts correctly", () => {
    // Render the component passing episode data and getting the rerender utility
    const { rerender } = render(<Episode episode={exampleEpisodeData} />);

    // Check that the summary renders to the DOM
    expect(screen.getByText(exampleEpisodeData.summary)).toBeInTheDocument();

    // Check that the alt text for the image is present
    const image = screen.getByAltText('episode image');
    expect(image).toBeInTheDocument();

    // Rerender the component passing episode data lacking an image
    rerender(<Episode episode={{ ...exampleEpisodeData, image: undefined }} />);
    
    // Check that the default image appears in the DOM
    const defaultImage = screen.getByAltText('generic episode image');
    expect(defaultImage).toBeInTheDocument();

    // Rerender the component passing an undefined episode
    rerender(<Episode episode={undefined} />);

    // Check that the "Loading episode..." text is present
    expect(screen.getByText('Loading episode...')).toBeInTheDocument();
  });
});