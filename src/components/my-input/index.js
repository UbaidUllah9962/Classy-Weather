const MyInput = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by city, country, or pin code..."
        value={props.location}
        onChange={props.onChangeLocation}
      />
    </div>
  );
};

export default MyInput;
