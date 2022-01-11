import { useEffect, useState } from 'react';

function useDocumentTitle(title) {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return [documentTitle, setDocumentTitle];
}

export default useDocumentTitle;
