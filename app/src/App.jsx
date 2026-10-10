import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      year
      rating
      author {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movies</h1>
      {data.movies.map(movie => (
        <div
          key={movie.id}
          style={{ marginBottom: '15px', borderBottom: '1px solid #ccc' }}
        >
          <h2>
            {movie.title} ({movie.year})
          </h2>
          <p>Rating: {movie.rating}</p>
          <p>Author: {movie.author?.name ?? 'N/A'}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
