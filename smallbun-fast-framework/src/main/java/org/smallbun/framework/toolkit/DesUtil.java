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

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.security.DigestException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author SanLi
 * @create 2017/12/7-14:41
 * @简书：http://www.jianshu.com/u/d5950a6af4cd
 * @博客: http://www.leshalv.net
 **/
public class DesUtil {
	private final static String DES = "DES/CBC/PKCS5Padding";
	private final static String Encoding = "UTF-8";

	/**
	 * SHA1 安全加密算法
	 *
	 * @param decrypt
	 * @param Upper   结果是否大写
	 * @return
	 * @throws DigestException
	 */
	public static String SHA1(String decrypt, boolean Upper) throws DigestException {
		try {
			//指定sha1算法
			MessageDigest digest = MessageDigest.getInstance("SHA-1");
			digest.update(decrypt.getBytes());
			//获取字节数组
			byte[] bytes = digest.digest();
			// Create Hex String
			StringBuffer hexString = new StringBuffer();
			// 字节数组转换为 十六进制 数
			for (int i = 0; i < bytes.length; i++) {
				String shaHex = Integer.toHexString(bytes[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexString.append(0);
				}
				hexString.append(shaHex);
			}
			if (Upper) {
				return hexString.toString().toUpperCase();
			} else {
				return hexString.toString();
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			throw new DigestException("签名错误！");
		}
	}

	/**
	 * DES加密字符串
	 *
	 * @param encryptString 待加密的字符串
	 * @param encryptKey    加密密钥,要求为8位
	 * @return 加密成功返回加密后的字符串，失败返回源串
	 */
	public static String EncryptDES(String encryptString, String encryptKey, byte[] ivP) {
		byte[] ret;

		try {
			// 从原始密匙数据创建DESKeySpec对象
			byte[] key = encryptKey.getBytes(Encoding);
			DESKeySpec dks = new DESKeySpec(key);
			// 创建一个密匙工厂，然后用它把DESKeySpec转换成
			// 一个SecretKey对象
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey secureKey = keyFactory.generateSecret(dks);
			// Cipher对象实际完成加密操作
			Cipher cipher = Cipher.getInstance(DES);
			// 用密匙初始化Cipher对象
			IvParameterSpec iv = new IvParameterSpec(ivP);
			cipher.init(Cipher.ENCRYPT_MODE, secureKey, iv);
			// 获取数据并加密
			byte[] src = encryptString.getBytes(Encoding);
			src = cipher.doFinal(src);
			Base64 enc = new Base64();
			ret = enc.encode(src);
		} catch (Exception ex) {
			ret = encryptString.getBytes();
		}
		return new String(ret);
	}

	/**
	 * DES解密字符串
	 *
	 * @param decryptString 待解密的字符串
	 * @param decryptKey    解密密钥,要求为8位,和加密密钥相同
	 * @return 解密成功返回解密后的字符串，失败返源串
	 */
	public static String DecryptDES(String decryptString, String decryptKey, byte[] ivP) {
		String ret;
		try {
			// 从原始密匙数据创建一个DESKeySpec对象
			byte[] key = decryptKey.getBytes(Encoding);
			DESKeySpec dks = new DESKeySpec(key);
			// 创建一个密匙工厂，然后用它把DESKeySpec对象转换成
			// 一个SecretKey对象
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey securekey = keyFactory.generateSecret(dks);
			// Cipher对象实际完成解密操作
			Cipher cipher = Cipher.getInstance(DES);
			// 用密匙初始化Cipher对象
			IvParameterSpec iv = new IvParameterSpec(ivP);
			cipher.init(Cipher.DECRYPT_MODE, securekey, iv);
			// 获取数据并解密
			Base64 dnc = new Base64();
			byte[] src = dnc.decode(decryptString.getBytes());
			src = cipher.doFinal(src);
			ret = new String(src, 0, src.length, Encoding);
		} catch (Exception ex) {
			ret = decryptString;
		}
		return ret;
	}

	/**
	 * DES加密字符串
	 *
	 * @param encryptString 待加密的字符串
	 * @param encryptKey    加密密钥,要求为8位
	 * @return 加密成功返回加密后的字符串，失败返回源串
	 */
	public static byte[] EncryptDES(byte[] encryptString, String encryptKey, byte[] ivP) {
		byte[] ret;

		try {
			// 从原始密匙数据创建DESKeySpec对象
			byte[] key = encryptKey.getBytes(Encoding);
			DESKeySpec dks = new DESKeySpec(key);
			// 创建一个密匙工厂，然后用它把DESKeySpec转换成
			// 一个SecretKey对象
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey secureKey = keyFactory.generateSecret(dks);
			// Cipher对象实际完成加密操作
			Cipher cipher = Cipher.getInstance(DES);
			// 用密匙初始化Cipher对象
			IvParameterSpec iv = new IvParameterSpec(ivP);
			cipher.init(Cipher.ENCRYPT_MODE, secureKey, iv);
			// 获取数据并加密
			ret = cipher.doFinal(encryptString);
		} catch (Exception ex) {
			ret = encryptString;
		}
		return ret;
	}

	/**
	 * DES解密字符串
	 *
	 * @param decryptString 待解密的字符串
	 * @param decryptKey    解密密钥,要求为8位,和加密密钥相同
	 * @return 解密成功返回解密后的字符串，失败返源串
	 */
	public static byte[] DecryptDES(byte[] decryptString, String decryptKey, byte[] ivP) {
		byte[] ret;
		try {
			// 从原始密匙数据创建一个DESKeySpec对象
			byte[] key = decryptKey.getBytes(Encoding);
			DESKeySpec dks = new DESKeySpec(key);
			// 创建一个密匙工厂，然后用它把DESKeySpec对象转换成
			// 一个SecretKey对象
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey secureKey = keyFactory.generateSecret(dks);
			// Cipher对象实际完成解密操作
			Cipher cipher = Cipher.getInstance(DES);
			// 用密匙初始化Cipher对象
			IvParameterSpec iv = new IvParameterSpec(ivP);
			cipher.init(Cipher.DECRYPT_MODE, secureKey, iv);
			// 获取数据并解密
			ret = cipher.doFinal(decryptString);
		} catch (Exception ex) {
			ret = decryptString;
		}
		return ret;
	}
}
