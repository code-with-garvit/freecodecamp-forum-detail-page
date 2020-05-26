styled = styled.default;
// Creating the Component
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      topics: [],
    };
  }

  componentDidMount() {
// Fetching information from the API
    fetch('https://buttercup-island.glitch.me/latest')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          users: data.users,
          topics: data.topic_list.topics,
        });
      });
  }

  getUserFromID(id) {
    return this.state.users.find(user => user.id === id);
  }

  render() {
		// returning the JSX
    return (
      <div className="topics-list">
        <div class="header">
          <div class="header__field header__rank">#</div>
          <div class="header__field header__topic">Topic</div>
          <div id="replace header-replies" class="header__field header__replies">Repls.</div>
          <div class="header__field header__views">Views</div>
          <div class="header__field header__activity">Act.</div>
        </div>
        {
          this.state.topics.map((topic, index) => {
            return <ForumTopic index={index+1} topic={topic} getUserFromID={this.getUserFromID.bind(this)}/>;
          })
        }
      </div>
    );
  }
}

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s:  '%ds',
    ss: '%ds',
    m:  '%dm',
    mm: '%dm',
    h:  '%dh',
    hh: '%dh',
    d:  '%d',
    dd: '%dd',
    M:  '%dM',
    MM: '%dM',
    y:  '%dy',
    yy: '%dY'
  }
});

// Setting Some Good Styles

const StyledForumTopic = styled.div`
  background-color: white;
  border: 2px solid #EAEAEA;
  border-radius: 1em;
  overflow: hidden;
  box-shadow: 0 1px 1px 0 rgba(250, 250, 250, 0.05);
  margin-bottom: 0.6em;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
const StyledTopicField = styled.div`
  border-right: 2px solid #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TopicRank = StyledTopicField.extend`
  width: 3em;
  font-weight: 500;
  color: #444;
`;
const TopicTitle = StyledTopicField.extend`
  display: inline-block;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3em;
  font-size: 0.9rem;
`;
const TopicLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;
  padding: 0.7em 1em;

  text-decoration: none;
  color: #333;

  &:hover {
    background-color: rgb(220,220,220);
  }
`;
const UserAvatar = styled.div`
  display: flex;
  align-items: center;
`;
const UserLink = styled.a`
  height: calc(1.5em + 4px);
	padding: 0 0.5px;
`;
const UserImage = styled.img`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  border: 2px solid #F0F0F0;
`;
const Posters = StyledTopicField.extend`
  display: flex;
  flex-direction: row;
  align-items: center;
	justify-content: space-between;

  width: 8.5em;

  padding: 0 5px;
  font-size: 1.15em;
`;
const CountField = StyledTopicField.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5em;
  color: #555;
`;

const ForumTopic = ({index, topic, getUserFromID}) => {
  return (
    <StyledForumTopic className="forum-topic">
      <TopicRank className="rank">{index}</TopicRank>
      <TopicTitle className="topic-title"><TopicLink href={`https://forum.freecodecamp.org/t/${topic.slug}`} target="_blank">{topic.title}</TopicLink></TopicTitle>
      <Posters className="posters">
        <UserAvatar className="avatar">
          {
            topic.posters.map((poster) => {
              const user = getUserFromID(poster.user_id);
              return (
                <UserLink href={`https://www.freecodecamp.org/forum/u/${user.username}`} target="_blank">
                  <UserImage title={user.username} src={`https://freecodecamp.org/forum${user.avatar_template.replace('{size}', 135)}`}/>
                </UserLink>
              );
            })            
          }
        </UserAvatar>
      </Posters>
      <CountField className="replies">{topic.reply_count}</CountField>
      <CountField className="views">{topic.views}</CountField>
      <CountField className="activity">{moment(topic.bumped_at).fromNow(true)}</CountField>
    </StyledForumTopic>
  )
};

ReactDOM.render(<App/>, document.getElementById("root"));
