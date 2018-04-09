/**
 * The FlatProjectionIndex reduces all events down to a single line and stores
 * the position of the newer event together with its location and creation time.
 * Now on insertion it is checked first, whether there is already another event
 * totally covered by the new event and thus can be removed or the start point
 * should be modified.
 * When you now query for a range of bytes you query for the next position
 * where p1 < p(query) and then you query the next position where p2 > p1
 * this process is repeated until px > p(query)
 *
 * @author Wolfgang Felbermeier (@f3lang)
 * @author Max Brinkmann
 */
class FlatProjectionIndex {

}

module.exports = FlatProjectionIndex;