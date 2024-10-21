const Home = () => {
    return (
      <div>
        <div id="header">
          <div id="buttons">
            <div id="navbar">
              <button>Nav bar</button>
            </div>
            <div id="account">
              <button>Account settings</button>
            </div>
            <div id="signout">
                <button>Sign out</button>
            </div>
          </div>
          <div id="welcome"><h1>Welcome |insert name|</h1></div>
        </div>

        <div id="body">
          <div id="messages">No new messages</div>
          <div id="events">No upcoming events</div>
          <div id="invites">No event invites</div>
        </div>
      </div>
    );
}
export default Home