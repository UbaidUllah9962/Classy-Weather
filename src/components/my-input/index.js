const MyInput = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search from location..."
        value={props.location}
        onChange={props.onChangeLocation}
      />
    </div>
  );
};

export default MyInput;
