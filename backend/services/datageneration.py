from datetime import datetime, timedelta
import random
from models.site import Site, Station
from models.measurement import Measurement, SensorMeasurement
from dependencies import get_db


class SensorInfo:
    def __init__(self, sn: int, model: str, station_id: int, id: int):
        self.sensor_id = id
        self.serial_number = sn
        self.model = model
        self.station_id = station_id


co2_sensor_1 = SensorInfo(sn=10001001, model="CO2 Monitor Pro X1", station_id=1, id=1)
co2_sensor_2 = SensorInfo(sn=10001002, model="CO2 Monitor Pro X1", station_id=2, id=3)
co2_sensor_3 = SensorInfo(sn=10001003, model="CO2 Monitor Pro X1", station_id=3, id=2)

sensors = [co2_sensor_1, co2_sensor_2, co2_sensor_3]

db = next(get_db())

try:
    for sensor in sensors:
        base_co2 = round(random.uniform(15, 50), 2)
        start_time = datetime(2026, 1, 1, 15, 0, 0)
        for i in range(167):
            measurement_time = start_time + timedelta(hours=i)
            measurement_data = Measurement(
                value=round(base_co2 + random.uniform(-5, 5), 2),
                time=measurement_time,
                station_id=sensor.station_id,
                unit_id=1,
                type="Automatic"
            )
            db.add(measurement_data)
            db.commit()
            db.refresh(measurement_data)
            sensor_measurement = SensorMeasurement(
                measurement_id=measurement_data.measurement_id,
                sensor_id=sensor.sensor_id
            )
            db.add(sensor_measurement)
            db.commit()
            print(f"Added measurement {measurement_data.measurement_id} for sensor {sensor.sensor_id}")
finally:
    db.close()
