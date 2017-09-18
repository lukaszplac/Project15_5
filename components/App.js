var GIPHY_PUB_KEY = '098760c7a8d44d66a1b32a31b6e1ce81';
var GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
      },

    handleSearch: function(searchingText) {  // 1.
      this.setState({
        loading: true  // 2.
      });
      this.getGif(searchingText)
        .then(data => {
          var gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          }
          this.setState({
            loading: false,
            gif: gif,
            searchingText: searchingText
          })
        })
        .catch((err_message) => console.log(err_message));
    },

    getGif: function(searchingText) {
      return new Promise(function(resolve, reject) {
           var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
           var xhr = new XMLHttpRequest();  // 3.
           xhr.onload = function() {
              if(this.status === 200) {
                resolve(JSON.parse(xhr.responseText).data);
              } else {
                reject("Error found. No GIF found");
              }
           }
           xhr.open('GET', url);
           xhr.send();
      })
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search
                  onSearch={this.handleSearch}
                />
            <Gif     
              loading={this.state.loading}
              url={this.state.gif.url}
              sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});