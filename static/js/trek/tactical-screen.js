var scannerTmpl = $( "#scannerObjectTmpl" ).html();
var $displayGrid = $( "#displayScreen" );
var scan_i;
var self;


// weird reversal of what we would think zoom means... probably
// a result of being in the denomenator everywhere...
// this confines the backwards math to this one page at least...
// like electron flow - / +


var rangeTmpl = $( "#rangeCircleTmpl" ).html();
var $range = $( "#circle_container" );

// Weapons-range Magic Number
// TODO: get this from the server
var PHASER_RANGE_M = 1000 * 1000;
var TORPEDO_RANGE_M = 300000 * 1000;
var sensorObjects = {};


function relativeCoordinates ( x, y, z ) {

    var weaponRange;
    if ( weaponZoom === "phasers" ) {

        weaponRange = PHASER_RANGE_M;

    } else {

        weaponRange = TORPEDO_RANGE_M;

    }

    var sp = self.position;

    // global ratio
    var ratio = $displayGrid.height() / ( zoom * weaponRange * 2 );

    // relative to ship
    var xRel = x - sp.x;
    var yRel = y - sp.y;
    var zRel = z - sp.z;

    // offset from center and scaled
    var xMap = ( $displayGrid.width() / 2 ) + xRel * ratio;
    // y coordinates are inverted on canvas elements
    var yMap = ( $displayGrid.height() / 2 ) - yRel * ratio;
    var zMap = 0;

    return { x : xMap, y : yMap, z : zMap };

}


function paintScan ( data ) {

    self = _.find(
        data,
        function ( e ) {

            return e.name == shipName

        } );

    _.each( data, function ( e ) {

        var coordinates = relativeCoordinates(
            e.position.x,
            e.position.y,
            e.position.z );

        var reading = {
            name : e.name,
            dist : trek.prettyDistanceKM( e.distance ),
            bearing : trek.prettyBearing( e.bearing.bearing ),
            speed : e.impulse
        };

        if ( e.name == shipName ) {

            reading.bearing = "";
            reading.dist = "";

        }

        reading.name_clean = e.name.replace( /_/g, " " );

        if ( _.has( sensorObjects, e.name ) ) {

            sensorObjects[ e.name ].css( "top", coordinates.y )
            sensorObjects[ e.name ].css( "left", coordinates.x );
            sensorObjects[ e.name ].html(
                Mustache.render( scannerTmpl, reading )
            );

        } else {

            var obj = $( Mustache.render( scannerTmpl, reading ) );
            obj.css( "top", coordinates.y )
            obj.css( "left", coordinates.x );
            sensorObjects[ e.name ] = obj;
            $displayGrid.append( obj );

        }

        } );

    var r = $displayGrid.height() / ( zoom * 2 );
    var x_offset = $displayGrid.width() / 2;
    var y_offset = $displayGrid.height() / 2;

    $range.html( Mustache.render( rangeTmpl, { r : r, x : x_offset, y : y_offset } ) );

}


function scan() {

    trek.api( "tactical/scan", paintScan );

}


// Don't display Red Alert on this subscreen
trek.onAlert( function() {

    return;

    } );

scan();
scan_i = setInterval( scan, 500 );