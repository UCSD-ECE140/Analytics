   // Get the logout button
   var logoutButton = document.getElementById("logout");

   // Add event listener to the logout button click
   logoutButton.addEventListener("click", function(event) {
       event.preventDefault();

       // Remove the currentUser entry from local storage
       localStorage.removeItem("currentUser");

       // Redirect to the index.html page
       window.location.href = "./index.html";
   });

   $(document).ready(function() {
       // fetch data from Slidespace API and populate table
       $.ajax({
           url: 'https://slidespace.icu/api/sections/A04/teams',
           dataType: 'json',
           success: function(data) {
               let leaderboardHtml = '';
               for (let teamId in data.names) {
                   let teamProduct = data.names[teamId];
                   $.ajax({
                       url: 'https://slidespace.icu/api/teams/' + teamId,
                       dataType: 'json',
                       success: function(teamData) {
                           $.ajax({
                               url: 'https://slidespace.icu/api/teams/' + teamId + '/scores',
                               dataType: 'json',
                               success: function(scoresData) {
                                   let rank = 1;
                                   for (let topicName in scoresData.scores) {
                                       if (scoresData.scores[topicName] < scoresData.scores[teamProduct]) {
                                           rank++;
                                       }
                                   }
                                   leaderboardHtml += '<tr><td>' + rank + '</td><td>' + teamData.team.name + '</td><td>' + teamData.team.members.join(', ') + '</td></tr>';
                                   $('#leaderboardTable').html(leaderboardHtml);
                               },
                               error: function(jqXHR, textStatus, errorThrown) {
                                   console.log('Error getting scores data for team ' + teamId + ': ' + errorThrown);
                               }
                           });
                       },
                       error: function(jqXHR, textStatus, errorThrown) {
                           console.log('Error getting team data for team ' + teamId + ': ' + errorThrown);
                       }
                   });
               }
           },
           error: function(jqXHR, textStatus, errorThrown) {
               console.log('Error getting team names: ' + errorThrown);
           }
       });
   });