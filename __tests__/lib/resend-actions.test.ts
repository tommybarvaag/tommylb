import { sendFormAction } from "@/lib/actions/resend-actions";
import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";

const originalFetch = global.fetch;

function buildFormData(fields: Record<string, string>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }

  return formData;
}

// The real form always renders the honeypot `phone` field, so a genuine
// submission carries it as an empty string (never absent).
const validFields = {
  fullName: "Tommy",
  email: "tommy@example.com",
  message: "Please call me back",
  phone: ""
};

describe("sendFormAction", () => {
  beforeEach(() => {
    process.env.RESEND_EMAIL_SENDING_API_KEY = "test-key";
    process.env.RESEND_EMAIL_RECIPIENT = "test@example.com";
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("treats a filled honeypot as success without sending", async () => {
    const fetchMock = jest.fn<typeof fetch>();
    global.fetch = fetchMock;

    const result = await sendFormAction(
      { status: "idle" },
      buildFormData({ ...validFields, fullName: "Tommy Barvåg", phone: "+4712345678" })
    );

    expect(result).toEqual({ status: "success" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns error for an invalid email without sending", async () => {
    const fetchMock = jest.fn<typeof fetch>();
    global.fetch = fetchMock;

    const result = await sendFormAction(
      { status: "idle" },
      buildFormData({ ...validFields, email: "not-an-email" })
    );

    expect(result).toEqual({ status: "error" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns error for an over-long message without sending", async () => {
    const fetchMock = jest.fn<typeof fetch>();
    global.fetch = fetchMock;

    const result = await sendFormAction(
      { status: "idle" },
      buildFormData({ ...validFields, message: "x".repeat(5001) })
    );

    expect(result).toEqual({ status: "error" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends plain text (no html) and returns success when the request succeeds", async () => {
    const fetchMock = jest
      .fn<typeof fetch>()
      .mockResolvedValue({ ok: true } as unknown as Response);
    global.fetch = fetchMock;

    const result = await sendFormAction({ status: "idle" }, buildFormData(validFields));

    expect(result).toEqual({ status: "success" });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    const body = JSON.parse(options.body as string);

    expect(body).toHaveProperty("text");
    expect(body).not.toHaveProperty("html");
    expect(body.text).toContain(validFields.message);
  });

  it("returns error when the request is not ok", async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({ ok: false } as unknown as Response);

    const result = await sendFormAction({ status: "idle" }, buildFormData(validFields));

    expect(result).toEqual({ status: "error" });
  });

  it("returns error when the request rejects", async () => {
    global.fetch = jest.fn<typeof fetch>().mockRejectedValue(new Error("network"));

    const result = await sendFormAction({ status: "idle" }, buildFormData(validFields));

    expect(result).toEqual({ status: "error" });
  });
});
