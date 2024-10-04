export default eventHandler(async (event) => {
  return hubBlob().serve(event, event.context.params!.pathname)
})