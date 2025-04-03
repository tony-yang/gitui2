from typing import Any
from typing import Dict
import logging

from uvicorn.config import LOGGING_CONFIG


def log_config_with_time(config: Dict[str, Any]) -> Dict[str, Any]:
    config["formatters"]["default"]["fmt"] = (
        "%(asctime)s " + config["formatters"]["default"]["fmt"]
    )
    config["formatters"]["access"]["fmt"] = (
        "%(asctime)s " + config["formatters"]["access"]["fmt"]
    )
    return config


logging.config.dictConfig(log_config_with_time(LOGGING_CONFIG))
