import React from "react";
const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>About This Demo</h1>
      <p>
        This demo illustrates how to use a <strong>React custom hook</strong> to efficiently manage a corporation’s head and branch offices.
      </p>

      <h2>Why Use React’s Custom Hooks?</h2>
      <p>
        Custom hooks encapsulate reusable logic within a function, making components <strong>cleaner, more maintainable, and highly reusable</strong>.
      </p>

      <h2>Key Benefits of Custom Hooks</h2>
      <ul>
        <li>
          <strong>Code Reusability → Write once, use anywhere</strong>
          <p>Eliminates repetitive logic across multiple components, promoting efficiency.</p>
        </li>
        <li>
          <strong>Separation of Concerns → Keep UI and logic separate</strong>
          <p>Components focus solely on rendering UI, while hooks handle data fetching, state management, and side effects.</p>
        </li>
        <li>
          <strong>Cleaner & More Readable Code → Reduce clutter</strong>
          <p>Extracting logic into a custom hook results in shorter, more readable components.</p>
        </li>
        <li>
          <strong>Easier Testing → Isolated logic</strong>
          <p>Hooks can be tested independently, without requiring a full component render.</p>
        </li>
        <li>
          <strong>Enhanced Performance → Minimize unnecessary re-renders</strong>
          <p>Hooks optimize state updates and memoize values for improved efficiency.</p>
        </li>
      </ul>

      <h2>Understanding the <code>useOffices</code> Custom Hook (React + TypeScript)</h2>
      <p>
        The <code>useOffices</code> hook simplifies the process of fetching, updating, and managing office data from an API. 
        It efficiently handles <strong>state, API calls, pagination, and error management</strong> for office-related operations.
      </p>
    </div>
  );
};

export default Home;