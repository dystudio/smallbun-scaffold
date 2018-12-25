/*
 *
 *  * Copyright(c)[2018] [smallbun] www.smallbun.org
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

package org.smallbun.framework.toolkit;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * datacenter是一个整数, 用于设置数据中心; worker是一个整数, 用于设置数据中心的机器序号; twepoch是一个64位的整数,
 * 用于设置时间戳基数, 此值越大, 生成的唯一ID越小. 0 41 51 64 +-----------+------+------+ |time |pc
 * |inc | +-----------+------+------+
 * <p>
 * •前41bits是以微秒为单位的timestamp。 •接着10bits是事先配置好的机器ID。 •最后12bits是累加计数器。
 */

public class IdWorker {
	// 机器标识位数 最多32台机器
	private final static long workerIdBits = 5L;
	// 毫秒内自增位 每毫秒产生最多32个ID
	private final static long sequenceBits = 5L;
	// 机器ID偏左移
	private final static long workerIdShift = sequenceBits;
	// 时间毫秒左移
	private final static long timestampLeftShift = sequenceBits + workerIdBits;

	private final static long sequenceMask = -1L ^ (-1L << sequenceBits);

	private static long lastTimestamp = -1L;

	private long sequence = 0L;
	// 当前工作者id=8
	private final long workerId = 8;

	public synchronized long nextId() {
		long id = 0;

		try {
			long timestamp = timeGen();
			long twepoch = twepochGen();
			if (timestamp < lastTimestamp) {
				try {
					throw new Exception(
							"Clock moved backwards.  Refusing to generate id for " + (lastTimestamp - timestamp)
									+ " milliseconds");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (lastTimestamp == timestamp) {
				// 当前毫秒内，则+1
				sequence = (sequence + 1) & sequenceMask;
				if (sequence == 0) {
					// 当前毫秒内计数满了，则等待下一秒
					timestamp = tilNextMillis(lastTimestamp);
				}
			} else {
				sequence = 0;
			}
			lastTimestamp = timestamp;
			// ID偏移组合生成最终的ID，并返回ID
			id = (timestamp - twepoch) << timestampLeftShift | workerId << workerIdShift | sequence;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return id;
	}

	private long tilNextMillis(final long lastTimestamp) throws ParseException {
		long timestamp = this.timeGen();
		while (timestamp <= lastTimestamp) {
			timestamp = this.timeGen();
		}
		return timestamp;
	}

	private long timeGen() throws ParseException {
		return System.currentTimeMillis();
	}

	private long twepochGen() throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = "2012-10-10 00:00:00";
		Date date = format.parse(time);
		return date.getTime();
	}


}