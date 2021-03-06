var scannerTmpl = $( "#scannerObjectTmpl" ).html();
var radiusTmpl = $( "#scannerRadiusTmpl" ).html();
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


function relativeRadius ( r ) {

    var weaponRange;
    if ( weaponZoom === "phasers" ) {

        weaponRange = PHASER_RANGE_M;

    } else {

        weaponRange = TORPEDO_RANGE_M;

    }

    // global ratio
    var ratio = $displayGrid.height() / ( zoom * weaponRange * 2 );
    return r * ratio;

}


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

    self = _.find( data, function ( e ) {

            return e.name == shipName

    } );

    var scannedNames = [];

    _.each( data, function ( e ) {

        scannedNames.push( e.name );

        var coordinates = relativeCoordinates(
            e.position.x,
            e.position.y,
            e.position.z );

        var reading = {
            name : e.name,
            dist_and_bearing : trek.prettyDistanceKM( e.distance ) + ", " + trek.prettyBearing( e.bearing.bearing ),
            dist : trek.prettyDistanceKM( e.distance ),
            bearing : trek.prettyBearing( e.bearing.bearing ),
            speed : e.impulse
        };

        if ( e.name == shipName ) {

            reading.bearing = "";
            reading.dist = "";
            reading.dist_and_bearing = "";

        }

        tmpl = scannerTmpl;

        if ( e.radius !== undefined ) {

            reading.radius = relativeRadius( e.radius );
            reading.diameter = reading.radius * 2 + 2;
            reading.start_radius = reading.radius + 1;
            coordinates.y -= reading.radius;
            coordinates.x -= reading.radius;
            tmpl = radiusTmpl;

        }

        reading.name_clean = e.name.replace( /_/g, " " );

        if ( _.has( sensorObjects, e.name ) ) {

            sensorObjects[ e.name ].css( "top", coordinates.y )
            sensorObjects[ e.name ].css( "left", coordinates.x );
            sensorObjects[ e.name ].html(
                Mustache.render( tmpl, reading )
            );

        } else {

            var obj = $( Mustache.render( tmpl, reading ) );
            obj.css( "top", coordinates.y )
            obj.css( "left", coordinates.x );
            sensorObjects[ e.name ] = obj;
            $displayGrid.append( obj );

        }

    } );

    // remove objects no longer in the data scan
    _.each( sensorObjects, function( v, k ) {

        if ( _.indexOf( scannedNames, k ) == -1 ) {

            v.remove();

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
