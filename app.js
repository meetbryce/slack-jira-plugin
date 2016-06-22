var slackbot = require('./lib/bot');
var env = process.env;

var config = {
  showIssueDetails: false,
  issueDetailsToShow: {'fields.summary':1 , 'fields.assignee' : 1, 'fields.creator' : 0, 'fields.description': 1},
  showDetailsByDefault: false,//if true, you don't need the '+' to get details
  bot_name: "JIRA",//Provide the name to post under
  token: env.SLACK_TOKEN, // https://api.slack.com/web
  jira_urls: {
    // DEFAULT NODE IS REQUIRED.
    "DEFAULT": {url: "https://default.jira.server/browse/"},
    // These should match projects from the projects property where you want to use a configuration other than the default
    env.JIRA_PROJECT_KEY: {
      url: env.JIRA_HOST_URL,
      jira: {
        user: env.JIRA_USERNAME, // be sure to use the username, not the user email
        password: env.JIRA_PASSWORD,
        host: env.JIRA_HOST,
        protocol: 'https',
        port: 443,
        version: '2',
        verbose: true,
        strictSSL: true
      }
    }
  },
  search_cmd: "search",
  //Since search results can be verbose, you may not want to muddy the channel
  search_output_chan: "this",//if the value is "this", then the current channel will be used, else the name of a channel
  projects: [env.JIRA_PROJECT_KEY],
  post: true,
  verbose: false,
  custom_texts: {
    messagePrefix: "" //message you might like to prefix to JiraBot's post
  },
  emoji: ":jira:", // be sure to upload your custom emoji in slack
  link_separator: env.LINK_SEPARATOR,// use \n if you want new lines
  error_channel: '' //the id of the channel to send low level log errors.  If not defined, will use the current channel
};

//DO NOT EDIT BELOW HERE
var slackbot = new slackbot.Bot(config);
slackbot.run();