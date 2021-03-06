var StoryboardScreen = function(thisScreen, textCompleteBeforeNext) {
  var screen = new Phaser.Group(thisScreen.game, null, thisScreen.name+"Storyboard", true);
  screen.add(thisScreen);

  screen.textCompleteBeforeNext = textCompleteBeforeNext;

  screen.addPrevious = function(previousScreen){
  	this.previousScreen = previousScreen;
  	var screen = this;

  	this.add(new Phaser.Button(this.game,
  		  20,
  		  200,
        'left_arrow',
	  		function() {
	  		  screen.showPreviousScreen();
	  	  }
  	  )
  	);
  }

  screen.addNext = function(nextScreen){
  	this.nextScreen = nextScreen;
  	var screen = this;
  	this.add(new Phaser.Button(this.game,
  		  780 - 50,
  		  200,
        'right_arrow',
	  		function() {
	  		  screen.showNextScreen();;
	  	  }
  	  )
  	);
  }

  screen.showPreviousScreen = function() {
    this.previousScreen.addNext(this);

    this.hide();
    this.previousScreen.show();
  }

   screen.showNextScreen = function() {
   	if (this.textCompleteBeforeNext) {
   	  if (this.textCompleteBeforeNext.displayProgress < 1) {
   	  	return;
   	  }
   	}
    this.nextScreen.addPrevious(this);

    this.hide();
    this.nextScreen.show();
  }

  screen.show = function() {
  	this.visible = true;
    this.setAllChildren('visible', true);
    this.setAll('visible', true);

  }

   screen.hide = function() {
    this.visible = false;
    this.setAllChildren('visible', false);
    this.setAll('visible', false);
  }

  screen.hide();

  return screen;
}