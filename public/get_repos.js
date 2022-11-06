var repoListClass = '.repo_list';
let first_time = false;

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function fetchRepos () {
  
  return $.ajax({
    url: "https://api.github.com/users/MassimoSandre/repos",
    type: "get",
    dataType: "jsonp"
  });
}            

function getRepos (maxDisplayedRepos) {
  var request = fetchRepos();
  
  request.fail(function (jqXHR, status, err) {
    alert( err );
    $( repoListClass ).append("Something went wrong while trying to fetch Github repositories...")
    
  });
  
  request.success(function (data) {
    var repos = data.data;
    // Clear the list of repos
    $( repoListClass ).children().remove();

    repos = shuffle(repos);
    
    if (repos.length > maxDisplayedRepos) {
      repos = repos.slice(0,maxDisplayedRepos)
    }

    // Refresh the list of repos
    if (repos.length > 0){
      $(repos).each(function (repo) {
        $( repoListClass ).append(
            $('<li><a href = "https://github.com/MassimoSandre/' + repos[repo].name + '" "class = "project">' + repos[repo].name + ' <div class=\'underline\'></div></a></li>')
        );
      });
    }else{

      $( repoListClass ).append('<li><a href = "https://github.com/MassimoSandre" class = "project">No repositories found...</a></li>');
    } 


  });
}

getRepos(5);