# Trek PMO
Trek Project Management, because sometimes a checklist is all you need.

# Coordinate System
## Headings
Counterclockwise, 0 - 1, the x axis marks 0, for simplicity of trig. The bearing system is [LONGITUDE] mark [LATITUDE]. Latitudal movement is not yet implemented.

## Scope
Space is big; this game is meant to take place over the space of a solar system, and posibly a sector, since it takes no time at all to move accross a system at warp 6.

A sector is a 20-lightyear cube, and at Warp 6 a ship travels at [blank]. Meaning the entire board can be crossed in [blank]. Warp speed is generally not possible inside a solar system (probably for navigational safety reasons).

## Timeouts
Responses that involve a timeout (eg a system scan), will return response object that includes a timeout parameter, which it is the responsibility of the interface layer to implement (ie the web server and console layer).
- Shields take 13 seconds to raise

## Power Systems
Power in Trek is measured units called Dynes. All major systems operate in Megadynes, and so all power units are expressed in MDyn.

# Tech debt and refactoring
- [ ] Consolidated CSS
  - [ ] Also, refactor to use stylus
- [ ] Class-selector CSS
  - [ ] find and kill all id-based css rules
- [ ] Coding-style cleaned JS
  - [ ] implement the Mr. Doob JS standard everywhere
- [ ] All HTML must use base templating
- [ ] Fix the API
  - [x] Get the API turned into a RESTful API
  - [ ] Consolidate the endpoints so that it's not just one method per url
- [x] Reduce the use of Constants
  - Rely more on class variables for these things

# Current Sprint
- [x] Fix Transporters
- [x] Fix Operations / Internal crew movement
  - [x] Where are the rest of the crews?
- [ ] Fix the Impulse direction indicator
- [x] Fix combat 
  - [x] torpedo strikes don't seem to be working well
  - close range manuvering is required for phasers
- [x] Captains log
  - [x] Get a captain's log displaying when the main viewer initiates
- [ ] Cooperative Mission Profile
  - [ ] We need environmental and internal science screens
    - [x] Environmental
    - [ ] Internal
  - [ ] We'll need subsystem targetting for weapons
  - [ ] We'll need engineering and tactical to have a better shield status display
  - [x] Create a scenario where two teams must cooperate
    - [ ] Make it possible to win solo
  - [x] Create game level events to trigger actions
- [-] Engineer minigame miracle fixes
- [x] Engineering power allocation fixes
- [ ] Music/sound (Theme music, and red alerts. Phasers and torpedo hits.)
  - [ ] https://www.youtube.com/watch?v=7J-y2rFfny8 (red alert)
  - [x] Enterprise-B bridge sounds from Generations
  - [x] Theme from Original Motion picture
  - [ ] Explosions

# Backlog
## Next Sprint
- [ ] Navigation
  - [ ] Thruster manuvering
    - required for phaser combat
  - [ ] Navigation status display

## For Breakout
- Pretty Renders
  - http://devlog-martinsh.blogspot.ca/2011/12/glsl-depth-of-field-with-bokeh-v24.html
  - Just putting a minor blur on the material might be enough
  - Also, making the stations rotate a bit could help
  - Have speed and rotation displayed on the main viewer
  - Permanently bake the stars in so they don't change on refresh
  - Background nebula art
    - http://learningthreejs.com/blog/2011/08/15/lets-do-a-sky/
    - [http://www.johannes-raida.de/tutorials/three.js/tutorial04/tutorial04.htm]
      + This shows how to build a vertex color. Use this in combinaiton with a icosphere and a goland tool to map out a vertex from a bitmap
      + http://12devsofxmas.co.uk/2012/01/webgl-and-three-js/
- Internal Personnel
  - What happens when you over assign repair teams?
  - Send crews to sections of the ship (transport, sickbay, etc)
    - Medical teams should be able to heal members on their deck/section
    - Teams in sickbay should get healthier
  - Intruders
    - Figure out what happens when non-aligned parties beam aboard (IE if we beemed them aboard, take them to the brig, if they beamed aboard, they start attacking crew and disrupting systems)
    - Refactor the crew stuff, as we've simplified the Crew subclasses
- Tactical
  - Subsystem targetting!
  - Weapons targeting should be it's own screen... with subsystems ability (if an active scan has been performed)
- I should be affected by the environment
  - plot intercepts via radii
  - different types of cause and effect
- Sector maps and other systems
  - Setup LY-based coordinates for objects not in systems
  - Compound coordinates? LY coordinates, offset by metrics is you're in a system
  - In system sets your LY coordinates to that of the system, and calculates your offset as your position
  - Enter and leave systems when your delta to a system closes within 80AU
- Tractor Beam
- Shuttles
- The ability for engineering to salvage parts from non-essential systems during an emergency
- All the render delay is in the loader... if we're going to cache anything in the display, it should be in the parent frame, and then into local storage...
- Use this for animating transporters:
  - http://julian.com/research/velocity/
- Display screen (use laptop cameras)???
- Explosions disrupt warp fields (seems needed for realism, but if not, makes for good ability to run away); perhaps?
  - Might not be needed; you'll want to drop out of warp to turn and fight
- Additional Screens
  + Shields status for engineering
  + Shield "Scotty" nback iframe
    + Minigame for engineering to allow miracle fixes
  + Thruster navigation for helm
  + Library / Logs
  + Working sector nav


# Alpha Test Issues
Feedback taken from real user testing

## Alpha 2 Issues
- [ ] Coorperative training missions
- [ ] Going to warp > 6 crashed the server
  - [ ] Raising this sort of error has never crashed the server in dev; what's going on?
    - http://stackoverflow.com/questions/5999373/how-do-i-prevent-node-js-from-crashing-try-catch-doesnt-work
    - http://engineering.fluencia.com/blog/2013/12/20/the-4-keys-to-100-uptime-with-nodejs
    - A thought: throwing errors in asynchronus functions won't get handled by the web callback, and will thus crash the server, so we need to raise errors at the start of the callback, or find a way to have a universal error handler(?)
- [ ] There was a strange error where going to warp was prevented by the Inertial Dampeners being offline... Engineering showed that they were completely online... What's up with that?
- [x] All of the power systems were starting up at full power usage instead of minimum... we need to fix that up. Also, while it's good for most systems to use min power operationally, Shields and Weapons systems should probably start closer to 25%
- [x] It's unclear from the tactical screen what the respective ship orientation is, and so whether or not it's possible to fire
- [ ] Engineer and Ops screens require a legend for their displays
- [ ] Damage indication (screen cracking should be working)

## Alpha 1 Issues
- [ ] Captain's log... There should be a screen where you can display mission objecives
- [x] Engineering
  - [x] We need a feedback screen when something blows up, power wise
- [x] Ops
  - [x] Transporters don't seem to be working
  - [x] When we over-assign repair crews, we don't get the raised error from the ship object
- [x] Science
  - [x] The active scan needs to display a progress bar of some kind
    - [x] Scanning... Complete... Compiling composite scan...
    - [x] The active scan array should be able to work even when the ship has turned. This could be accomplished by giving every object a base GUID that we could then use to track back on, like an object hash.
- [x] Tactical
  - [x] Torpedo loading needs to be limited
    - [x] Torpedo tube launch status EMPTY... LOADING... LOADED
    - [x] on Red Alert, begin loading tubes
  - [x] The location of the ship seems to disapear when the subspace transponder is offline... we should probably fix that so that the ship is filtered out of the scan, but automatically inserted back in the display
- [x] Comm
  - [x] Ability to zoom around
  - [x] Fix the "Plot intercept" menu as a fly out that display over the screen to select a target
  - [x] Fix "Plot Intercept" to kill negative number results, and display an error if the plotted intercept was impossible.
- [x] Stop socket and polling errors from showing up on the console screen after a server restart
  - [x] Figured out that we need to do this sort of thing in server by checking the return value of the validate function


# Bug log
- [x] Intermittent circular reference to JSON bug on get\_scan
  + [x] should probably control what gets fed back in the public data
  + [x] reproduced during a torpedo firing event: It's definitely the torp
- [x] Firing torpedoes seems unresponsive on occasion, WTF is up with that?
  + [x] It seems that the system gets gummed up trying to complete the process with the first torpedo; it eventually fires the torpedo
- [ ] Torpedoes are veering off 90 Degrees clockwise from target?
  - They use the same tracking code as the ships?!
- [x] Firing a torpedo without a target needs to be addressed/disabled
- [x] Setting views to mainscreen seems to call multiple times (ie it'll flicker on an off), and subsequent calls to "Mainviewer" won't fire
  - [x] Probably waiting on a server response... double check that all handler issue a response.
- [ ] The colours of the indicators for the transporter menu returning away teams don't work (the green exception)
- [ ] Transporter doesn't stop you from trying to transport without having selected a destination
- [x] Targeting circle in tactical is broken?
- [x] We need a warning when an EPS has blown
- [x] Crew are reported on a deck when they are just enroute, we need a distinction
- [ ] Security teams on deck G don't show up in transorter options
- [ ] Port shields seems to go offline (?) weird accumulated system damage
- [ ] Red Alert not setting correctly as status in tactical menu
- [ ] The position of ships relative to each other in the tactical display is not the same as in the nav display
- [x] Nav & Tactical screen text shrinks on FF
  - Set font size to 8px instead of 0.5em
- [ ] Science Scanner circles don't show up on FF
- [x] Nav orientation arrow is 90 degrees CCW off
  - Added a " - 90"; try now
- [ ] Objects get tracked once we've done a detailed scan... so how do we untrack them? At some point, we should be able to loose them
- [ ] It doesn't look like LR scanners can be configured?

# Completed Sprints

## v0.1 [COMPLETE]
### Basic Combat, pt III
- [x] Start a game and get given a prefix code, and captain's log
- [x] Scan for ships
- [x] Get bearings to enemy ship
- [x] Set course
  - [x] Fix the ship so that changes to heading will alter the velocity
- [x] Set impulse to get closer to ship
- [x] Raise sheilds
- [x] Target ship
- [x] Fire at ship until a shield fails
- [x] Warp out to escape

## v0.2 [COMPLETE]
### Basic Combat, pt II
- [x] set warps greater than 1 accurately
- [x] scan for a moving target
- [x] plot a course (intercept)
  + [x] match base velocity and heading
- [x] have the computer match speed and heading when we approach a nav target (destination)
- [x] fire torpedos
  + [x] arm torpedos
  + [x] Vmax = Vi - [x](0.75\*(Vi/c))
  + [x] have torpedoes plot intercept coordinates
  + [x] torpedoes set to steer in warp, and tuned the honing parameters (otherwise no chance)
- [x] get shot (MVP = no AI: used `command` instead)
- [x] phasers shouldn't work at warp
- [x] destroy a target
- [x] set alerts

## v0.2b
### Console MVP [COMPLETE]
- [x] Have a welcome screen severed in a web console
- [x] Select a ship: Enter a prefix number, get validated
- [x] Get presented with a lists of screens
  + [x] Conn (Helm & Navigation)
    * [x] Display a map of the system with scan objects
    * [x] *for whatever reason this only works once, and not on refresh*
    * [x] Set course
    * [x] Set speed
    * [x] Plot intercept with object
    * [x] x(this was an ugly ugly hack: NEEDS REFACTOR)
    * [x] might be nice to return estimated intercept time so the client can start a countdown
    * [x] Improved workflow: plot intercept target, then set speed per usual and engage handles the "if intercept\_target" business
  + [x] Tactical
    * [x] Select targets
    * [x] Fire weapons
    * [x] Set alert

## v0.2c
### Console MVP [COMPLETE]
- [x] Main viewer
  + [x] Ability to assign URLs to the mainviewer
- [x] Tactical
  + Notes:
    * Phaser range = 1,000km
    * Torp range = 300,000km
    * 16 yield levels (let's make this exponential)
    * Phasers can fire at warp if you're *very* close together (5km)
    * http://www.ex-astris-scientia.org/inconsistencies/treknology-weapons.htm
  + [x] Select yield options
  + [x] Weapons range viewer / zoom ability
  + [x] Phaser / Torp zoom
  + [x] Draw a circle around the ship to show range
  + [x] Torpedo inventory (96 from a manual count in ST:VI)
  + [x] *BUG* Range seems wrong: closing to within < 1000km still shows target outside the circle
  + [x] Initial state settings / update state
- [x] Proper damage calculations for the world
- [x] Pull out torpedo logic, and replace with a probability of impact, or something more controlled than JS trying to impact some integers w/ clock calcs
- [x] Engineering
  + [x] Damage report

## v0.3 [COMPLETE]
### Cargo / Transporters / Repair Teams (OPS Theme)
- [x] visit space stations
  + [x] cargo scans
  + [x] cargo transporters
- [x] beam personelle to other stations
  + [x] beam security teams aboard
  + [x] beam teams back
- [x] get cargo from stations
- [x] I want to be able to assign repair crews
- [x] send hails
- [x] View stations on screen
  + [x] Get initial starfield
  + [x] Display three.js asset
  + [x] Have a star
  + [x] Create Viewscreen page with camera options
    * [x] Foreward
    * [x] Selected target
  - [x] Define a visual range
- [x] Web Interface:
  + [x] Ops
    * [x] Transporters / Away Missions
      - [x] View places within transporter ranger
      - [x] Transport away teams away
      - [x] Transport away teams to
      - [x] Transport crew from
        - [x] Need to rebuild crew and internal_personnel whenever sublists change
      - [x] Transport cargo to
      - [x] Transport cargo away
    * [x] Repairs
      - [x] View damaged system details
      - [x] Send repair crews to different systems 
    * [x] Crew
      - [x] View crew on different decks
      - [x] Send crew to different decks
    * [x] Cargo/inventory mgmt

## v 0.4 [COMPLETE]
- [x] Hull Damage
  + [x] When phaser fire is incurred, the hull should be damaged
  + [x] When torpedo / explosions occur, the hull should be damaged
- [x] Damage distribution
  + [x] Systems should be damaged according to the deck they hit
  + [x] Shields should only offer a dampening of damage, and that should decrease as they weaken
- [ ] Levels
  + [x] Load level objects
  + [x] Have ships, stations, and celestial objects be defined in the level
  + [x] Have a victory condition specified in the level that can be tested
  + [x] Have some means of displaying a "Game Over" message to all the teams
    * [x] EJS alows for imports; use these to build up templates and trek.js
    * [x] http://css-tricks.com/animating-svg-css/

## v 0.5 [COMPLETE]
- [x] Power Systems
  - [x] Systems must have a greyout, operational, and maxrated power level
  - [x] Systems are tied together via EPS grids
  - [x] System power status should be checked as part of it's health check
  - [x] Systems above operational rating should experience damage
  - [x] Systems above max rated should have a probability of blowing
  - [x] EPS Grids must distribute all their power to all sub systems
  - [x] EPS Grids can themselves overload if too much power is passed through them
  - [x] Warp core and impulse reactors can have their energy output scaled up and down
- [x] Ship Power Systems
  - [x] Power systems should be able to calculate the draw required of their attached systems
  - [x] Have ability for ship to calculate and plot complex power routes (IE Warp power to forward shields) for as not to blow up all the power relays
  - [x] Systems performance should now be taken into account (system.performance()) when using the systems (IE Transporter range, shield regeneration, sensor range, phaser strength, etc)
  - [x] Have charge systems recharge over time, provided they have power (the recharge rate is x1 at operational power, <1 in the greyout band, and >1 in the operational to max band)
  - [x] Reactors should be able to be turned down, causing power drains to systems
  - [x] EPS junctions should be able to be switched to impulse or emergency power
- [x] Allocated Power
  - [x] Engineering should be able to dial up individual system power
  - [x] Engineering should be able to reroute EPS sources
  - [x] Engineer should be able to turn systems on and off
  - [x] Engineer should be able to dial down reactors

## v 0.6 [COMPLETE]
- [x] Working Science Screen
  - For reference: http://www.startrekfreedom.com/wiki/index.php/Sensors
  - [x] Scans by volume/time/type
    - [x] Ship scan
    - [x] Game object scan setup
    - [x] Long Range scanners
    - [x] Short Range scanners
      - [x] Quadrant limiting
  - [x] Long Range scanners
    - [x] See scans and display them
    - [x] Need to be able to set configuraton...
  - [x] Detailed scans of targetted objects
    - See discussion below on Highres scanning
  - [-] Spatial objects
    - [-] asteroids
    - [x] dust disks
    - [x] stars
    - [-] anomalies
    - [-] protoplanetary clusters
  - [x] Skewed circle of blocks with a data overlay in the bottom right corner: http://jsfiddle.net/4j8pn/6/
- [-] Debt
  - [x] Store results in scanner in absolute values; translate to relative only when reporting
  - [x] Scanner have multiple subarrays... refactor so that scanners can run multiple scan types simultaneously, and store those results
  - [x] Passive HighRes is the scan that detects ships, and should get special treatment...
  - [x] Active HighRes, (as well as navigation and weapons targeting) should be available once Passive HighRes has successfully isolated a target
  - [-] While it's nice that plasma clouds block scans, they should also be able to simply limit/attenuate scans
  - [x] Expose a "scanStatus" api, and include a time-to-complete/progress property on the scanner system
- [x] Hotfix: Plot intercept course appears to be 0.5 off of the actual required bearing (WTF?)
- [-] Hotfix: Gravimetric scans should always detect the local star, why doesn't it? *Totally not a problem... the LR scan only displays a quarter of the ring (fwd sweep) We should just make sure the ring in the browser only shows those grids.*
- [x] Hotfix: The grid numbers on the display are arranged backwards...
- [x] Hotfix: When "setcourse" gets called, we end up seeing it mulptile times on the server?
- [-] Hotfix: Changing scan resolution settings seems to now clear the device..
- [x] Hotfix: The sensor_sub screens don't handle red alerts correctly
- [x] Hotfix: Wire the transporter scans to use what the sensors see

## v 0.7 [COMPLETE]
- [x] Comm Refactor
  - [x] Clearing out underscores from names
  - [-] Plotting course to stationary objects is broken
  - [-] Velocity doesn't work at warp
  - [x] Setting speed above warp 6 is broken in the interface  
  - [x] Ability to zoom around
  - [x] Fix the "Plot intercept" menu as a fly out that display over the screen to select a target
  - [x] Fix "Plot Intercept" to kill negative number results, and display an error if the plotted intercept was impossible.
- Error Handling
  - [x] When express.js throws a 500 error, I want the client to be passed the message, so they can take action if desired.
  
## v 0.8 [COMPLETE]
- [x] Tactical
  - [x] Torpedo loading needs to be limited
    - [x] Torpedo tube launch status EMPTY... LOADING... LOADED
    - [x] on Red Alert, begin loading tubes
  - [x] The location of the ship seems to disapear when the subspace transponder is offline... we should probably fix that so that the ship is filtered out of the scan, but automatically inserted back in the display
  - [x] The target selection flyout menu should be a flyout, like the intercept menu
  - [x] Fix underscores in names
- [-] Balanced Weapons
  - [-] Tactical situation tests: Two constitution classes should be able to go toe-to-toe for more than one volley
- Torpedo logistics
  - [x] Have torpedo tubes
  - [x] Require tubes to be loaded, with a timeout
  - [x] Ensure inventory is managed
  - [x] Firing a torpedo without a target needs to be addressed/disabled
- [x] Ensure that jumping to warp would allow you to evade a torpedo
- [x] Have torpedoes send out notices to anyone looking at a target that they're about to hit
- [x] On torpedo hit, have every screen show damage
- [x] When you destroy a target, have it blow up in displays
  - [x] There's a bug with stations getting hit where they seem to all disapear
  - [x] How do stations process damage?

## v 0.9 [COMPLETE]
- [x] Ops Love
  - [x] Transporters don't seem to be working
  - [x] Crews en-route to destinations should be displayed as such
  - [-] ... make more awesome?

## v 0.10 [COMPLETE]
- [-] Engineering
  - [-] We need a feedback screen when something blows up, power wise
  - [-] EPS relay destruction needs to be more apparent
- [x] Bug:
  - [x] Trying to set the power of the Aft EPS circuit down to 99% causes the output to rise?!

## v 0.11 [COMPLETE]
- [x] Science
  - [x] The active scan needs to display a progress bar of some kind
    - [x] Scanning... Complete... Compiling composite scan...
    - [x] The active scan array should be able to work even when the ship has turned. This could be accomplished by giving every object a base GUID that we could then use to track back on, like an object hash.
    - [x] We need to display the text outputs
  - [x] We need to display power readouts


## v 0.12 [Sidetracked and reprioritized]
- [x] Battle Ratios
  - [x] Balance the torpedo hits, sheild balances and hull strengths required for accurate combat simulation
  - [x] Check to see if it's possible to get phasers working correctly here
  - [x] Torpedoes need to clear post-detonation
  - [x] White flash for explosions...
- [ ] Navigation
  - [x] Time to turn and make course corrections
    - [x] The viewscreen should indicate turns
  - [x] Warp animations
  - [ ] Thruster manuvering
    - We should have the ability to steer around other ships with thrusters
    - Especially true if we want to turn the ship in combat
    - [x] ability to rotate the ship around
      - [ ] Use callback result to highlight button
    - [x] put in delay when turning
    - [-] put in delay when jumping to warp
    - [-] put in acceleration delay
  - [-] Charge time on warp
  - [-] Warp powers require more power
    - [-] Handles the routing of extra power to manage the warp drive systems
  - [ ] Have the current operation and speed be displayed on the nav screen
- [ ] Need the ability to see the current sheild levels