export function placeholderResponse(
  name: string
) {
  return Response.json({
    message: `${name} API ready`,
    status: "placeholder",
  });
}