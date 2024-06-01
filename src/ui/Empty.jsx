function Empty({ resource, type }) {
  return type === "singel" ? (
    <p>Cloud not find this {resource}, please try again.</p>
  ) : type === "settings" ? (
    <p>Could not get {resource} right now.</p>
  ) : (
    <p>No {resource} could be found.</p>
  );
}

export default Empty;
