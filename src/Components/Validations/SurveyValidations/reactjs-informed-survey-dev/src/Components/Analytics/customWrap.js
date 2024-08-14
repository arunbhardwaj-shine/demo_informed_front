export default function wrapTransformToLatLon(Highcharts) {
  const H = Highcharts;
  H.wrap(
    H.Chart.prototype,
    "transformToLatLon",
    function (proceed, point, transform) {
      if (!isNaN(point.x) && !isNaN(point.y)) {
        return proceed.apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  );
  return H.Chart.prototype;
}
