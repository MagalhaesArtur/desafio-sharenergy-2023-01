import axios from "axios";

export const statusMessages = [
  { value: "200OK" },
  { value: "201Created" },
  { value: "202Accepted" },
  { value: "203Non-Authoritative Information" },
  { value: "204No Content" },
  { value: "205Reset Content" },
  { value: "206Partial Content" },
  { value: "207Multi-Status (WebDAV)" },
  { value: "208Already Reported (WebDAV)" },
  { value: "226IM Used" },
  { value: "300Multiple Choices" },
  { value: "301Moved Permanently" },
  { value: "302Found" },
  { value: "303See Other" },
  { value: "304Not Modified" },
  { value: "305Use Proxy" },
  { value: "306(Unused)" },
  { value: "307Temporary Redirect" },
  { value: "308Permanent Redirect (experimental)" },
  { value: "400Bad Request" },
  { value: "401Unauthorized" },
  { value: "402Payment Required" },
  { value: "403Forbidden" },
  { value: "404Not Found" },
  { value: "405Method Not Allowed" },
  { value: "406Not Acceptable" },
  { value: "407Proxy Authentication Required" },
  { value: "408Request Timeout" },
  { value: "409Conflict" },
  { value: "410Gone" },
  { value: "411Length Required" },
  { value: "412Precondition Failed" },
  { value: "413Request Entity Too Large" },
  { value: "414Request-URI Too Long" },
  { value: "415Unsupported Media Type" },
  { value: "416Requested Range Not Satisfiable" },
  { value: "417Expectation Failed" },
  { value: "418Im a teapot (RFC 2324)" },
  { value: "420Enhance Your Calm (Twitter)" },
  { value: "422Unprocessable Entity (WebDAV)" },
  { value: "423Locked (WebDAV)" },
  { value: "424Failed Dependency (WebDAV)" },
  { value: "425Reserved for WebDAV" },
  { value: "426Upgrade Required" },
  { value: "428Precondition Required" },
  { value: "429Too Many Requests" },
  { value: "431Request Header Fields Too Large" },
  { value: "444No Response (Nginx)" },
  { value: "449Retry With (Microsoft)" },
  { value: "450Blocked by Windows Parental Controls (Microsoft)" },
  { value: "451Unavailable For Legal Reasons" },
  { value: "499Client Closed Request (Nginx)" },
  { value: "500Internal Server Error" },
  { value: "501Not Implemented" },
  { value: "502Bad Gateway" },
  { value: "503Service Unavailable" },
  { value: "504Gateway Timeout" },
  { value: "505HTTP Version Not Supported" },
  { value: "506Variant Also Negotiates (Experimental)" },
  { value: "507Insufficient Storage (WebDAV)" },
  { value: "508Loop Detected (WebDAV)" },
  { value: "509Bandwidth Limit Exceeded (Apache)" },
  { value: "510Not Extended" },
  { value: "511Network Authentication Required" },
  { value: "598Network read timeout error" },
  { value: "599Network connect timeout error" },
];

export const apiCrud = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAuth = async () => {
  try {
    const token = localStorage.getItem("token");

    const responseCrud = await apiCrud.get("/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (responseCrud.data.message !== "ok") {
      return { message: "token inválido" };
    } else {
      return { message: "ok" };
    }
  } catch (err: any) {
    return err.response.data.message;
  }
};
