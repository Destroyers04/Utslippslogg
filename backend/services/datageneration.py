from datetime import datetime, timedelta
import random
from models.site import Site, Station
from models.measurement import Measurement, SensorMeasurement, Sensor
from dependencies import get_db


class SensorInfo:
    def __init__(self, sn: int, model: str, station_id: int, unit_id: int, base_value: float, variation: float):
        self.serial_number = sn
        self.model = model
        self.station_id = station_id
        self.unit_id = unit_id
        self.base_value = base_value
        self.variation = variation


# Flow rate sensors — unit_id=10 — Nm³/h, typical mid-sized combustion plant: 80 000–120 000
flow_sensor_1 = SensorInfo(sn=70001001, model="Flow Meter FM-500", station_id=1, unit_id=10, base_value=100000.0, variation=15000.0)
flow_sensor_2 = SensorInfo(sn=70001002, model="Flow Meter FM-500", station_id=2, unit_id=10, base_value=100000.0, variation=15000.0)
flow_sensor_3 = SensorInfo(sn=70001003, model="Flow Meter FM-500", station_id=3, unit_id=10, base_value=100000.0, variation=15000.0)

# PM10 dust sensors — unit_id=5 — mg/Nm³, EU limit 20–30, well-controlled plant: 5–20
pm10_sensor_1 = SensorInfo(sn=20001001, model="Dust Monitor DM-10", station_id=1, unit_id=5, base_value=12.0, variation=5.0)
pm10_sensor_2 = SensorInfo(sn=20001002, model="Dust Monitor DM-10", station_id=2, unit_id=5, base_value=12.0, variation=5.0)
pm10_sensor_3 = SensorInfo(sn=20001003, model="Dust Monitor DM-10", station_id=3, unit_id=5, base_value=12.0, variation=5.0)

# SO2 sensors — unit_id=6 — mg/Nm³, large combustion plant limit 200, typical: 80–200
so2_sensor_1 = SensorInfo(sn=30001001, model="SO2 Analyzer SA-200", station_id=1, unit_id=6, base_value=140.0, variation=40.0)
so2_sensor_2 = SensorInfo(sn=30001002, model="SO2 Analyzer SA-200", station_id=2, unit_id=6, base_value=140.0, variation=40.0)
so2_sensor_3 = SensorInfo(sn=30001003, model="SO2 Analyzer SA-200", station_id=3, unit_id=6, base_value=140.0, variation=40.0)

# NOx sensors — unit_id=7 — mg/Nm³, large combustion plant limit 150–200, typical: 100–250
nox_sensor_1 = SensorInfo(sn=40001001, model="NOx Analyzer NA-300", station_id=1, unit_id=7, base_value=160.0, variation=50.0)
nox_sensor_2 = SensorInfo(sn=40001002, model="NOx Analyzer NA-300", station_id=2, unit_id=7, base_value=160.0, variation=50.0)
nox_sensor_3 = SensorInfo(sn=40001003, model="NOx Analyzer NA-300", station_id=3, unit_id=7, base_value=160.0, variation=50.0)

# CO sensors — unit_id=8 — mg/Nm³, limit ~250, good combustion: 20–120
co_sensor_1 = SensorInfo(sn=50001001, model="CO Analyzer CA-100", station_id=1, unit_id=8, base_value=60.0, variation=30.0)
co_sensor_2 = SensorInfo(sn=50001002, model="CO Analyzer CA-100", station_id=2, unit_id=8, base_value=60.0, variation=30.0)
co_sensor_3 = SensorInfo(sn=50001003, model="CO Analyzer CA-100", station_id=3, unit_id=8, base_value=60.0, variation=30.0)

# Lead (Pb) sensors — unit_id=9 — ng/Nm³, EU limit 500 000, typical well-controlled: 50–200
pb_sensor_1 = SensorInfo(sn=60001001, model="Heavy Metal Monitor HM-1", station_id=1, unit_id=9, base_value=120.0, variation=50.0)
pb_sensor_2 = SensorInfo(sn=60001002, model="Heavy Metal Monitor HM-1", station_id=2, unit_id=9, base_value=120.0, variation=50.0)
pb_sensor_3 = SensorInfo(sn=60001003, model="Heavy Metal Monitor HM-1", station_id=3, unit_id=9, base_value=120.0, variation=50.0)

sensors = [
    flow_sensor_1, flow_sensor_2, flow_sensor_3,
    pm10_sensor_1, pm10_sensor_2, pm10_sensor_3,
    so2_sensor_1, so2_sensor_2, so2_sensor_3,
    nox_sensor_1, nox_sensor_2, nox_sensor_3,
    co_sensor_1, co_sensor_2, co_sensor_3,
    pb_sensor_1, pb_sensor_2, pb_sensor_3,
]


def insert_sensors(db, sensors):
    db_sensors = []
    for s in sensors:
        db_sensors.append(Sensor(
            model=s.model,
            serial_number=str(s.serial_number),
            station_id=s.station_id,
        ))
    db.add_all(db_sensors)
    db.commit()
    for s, db_s in zip(sensors, db_sensors):
        db.refresh(db_s)
        s.sensor_id = db_s.sensor_id
    print(f"Inserted {len(db_sensors)} sensors")


def generate_sensor_measurements(db, sensors):
    for sensor in sensors:
        base_value = round(random.uniform(sensor.base_value - sensor.variation, sensor.base_value + sensor.variation), 2)
        start_time = datetime(2025, 1, 1, 0, 0, 0)
        measurements = []
        for i in range(8760):
            measurement = Measurement(
                value=round(base_value + random.uniform(-sensor.variation, sensor.variation), 2),
                time=start_time + timedelta(hours=i),
                station_id=sensor.station_id,
                unit_id=sensor.unit_id,
                type="Automatic"
            )
            measurements.append(measurement)
            print(f"Prepared measurement {i + 1}/8760 for sensor {sensor.sensor_id} ({sensor.model})")
        db.add_all(measurements)
        db.flush()
        db.add_all([
            SensorMeasurement(measurement_id=m.measurement_id, sensor_id=sensor.sensor_id)
            for m in measurements
        ])
        db.commit()
        print(f"Added 8760 measurements for sensor {sensor.sensor_id} ({sensor.model})")


db = next(get_db())

try:
    insert_sensors(db, sensors)
    generate_sensor_measurements(db, sensors)
finally:
    db.close()
