
export const errorCauseList = {
  INVALID_TOKEN: 'invalid_token',
  UNKNOWN: 'unknown',
}

export const getApi = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  });

  return await verifyResponse(response);
};

export const postApi = async <T>(url: string, data: T, anonymousRequest = false) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(anonymousRequest),
    body: JSON.stringify(data),
  });

  return await verifyResponse(response);
};

async function verifyResponse(response: Response) {
  if (response.ok) {
    return response;
  }

  const data = await response.json();
  if (response.status === 403) {
    throw new Error(data?.error, { cause: errorCauseList.INVALID_TOKEN });
  }

  throw new Error(data?.error, { cause: errorCauseList.UNKNOWN });
}

function getHeaders(anonymousRequest = false) {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (!anonymousRequest) {
    headers['Authorization'] = localStorage.getItem('authToken') ?? ''
  }

  return headers;
}
