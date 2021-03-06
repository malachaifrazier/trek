# ASTRONOMY
# AU in meters
exports.AU = 149597870700

# LY in meters (too bit, actually... need to refactor down to AU)
exports.LY = exports.AU * 63240

# Nepture is technically at 30AU
exports.SYSTEM_WIDTH = 80 * exports.AU

exports.SOLAR_RADIUS = 7e8

# Meters per ms
exports.SPEED_OF_LIGHT = 299792.458

# TODO: Maximum impulse velocity is relative to ship class:
# Constitutions can do 0.8c, whereas early romulan warp would have been closer
# to a a 2c impulse system.
exports.IMPULSE_SPEED = exports.SPEED_OF_LIGHT * 0.8
exports.WARP_SPEED = exports.SPEED_OF_LIGHT
exports.SECTOR_SIZE = exports.LY * 20

# WORLD SPECIFIC DETAILS
# Misc
exports.SHIP_EXPLOSIVE_DAMAGE = 1e10
exports.VISUAL_RANGE = 300000 * 1000

exports.COUNTERCLOCKWISE = "CCW"
exports.CLOCKWISE = "CW"


# Alignments
# # Unaligned is hostile to everyone
exports.ALIGNMENT =
    NEUTRAL: 'Neutral'
    FEDERATION: 'Federation'
    KLINGON: 'Klingon'
    PIRATE: 'Pirate'
    ROMULAN: 'Romulan'
    UNALIGNED: 'Unaligned'


# Environmental State
exports.ENVIRONMENT =
    RADIATION : 'Radiation Levels'
    PARTICLE_DENSITY : 'Particle Density'
    SPATIAL_DISTORTION : 'Spatial Distortion'
    SUBSPACE_DISTORTION : 'Subspace Distortion'

# in seconds
exports.TIME_FOR_FULL_ROTATION = 10e3

exports.HULL_STRENGTH = 600
# Stations are presumed to be much stronger, as they're stationary
# and don't rely on SIFs and radiation shielding.
exports.STATION_HULL_STRENGTH = 2.78e4
# Percentage of hull breached deemed to be catastrophic
exports.STATION_CATASTROPHIC_HULL_BREACH = 0.15

# Scan Ranges
exports.SYSTEM_SCAN_RANGE = 10000 * 1000

# Timeouts
exports.SYSTEM_SCAN_DURATION = 2e4

exports.CREW_TIME_PER_DECK = 10 * 1000


# A warp field is intentionally projected, so it makes sense that
# it reads higher
exports.WARP_POWER_FIELD_MULTIPLIER = 10
