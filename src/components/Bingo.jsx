const Bingo = ({ bingo, setState }) => {
  if (!bingo.state) return <></>;

  setTimeout(() => {
    let copyBingo = Object.assign(bingo);
    copyBingo.state = false;
    setState({ bingo: copyBingo });
  }, 5000);

  return (
    <>
      <div id='win'>
        <p>BINGO</p>
      </div>
    </>
  );
};

export default Bingo;
