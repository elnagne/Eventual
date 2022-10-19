const userInfo = ({username}) => {
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">{username}</p>
      </div>
    </div>
  );
};

export default userInfo;
