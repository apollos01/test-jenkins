from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

database_username = 'root'
database_password = 'root'
database_ip = 'localhost'
database_name = 'recruit'
database_port = '3306'

engine = create_engine('mysql+mysqlconnector://{0}:{1}@{2}:{3}/{4}'.
                       format(database_username, database_password, database_ip, database_port, database_name))

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()