-- --------------------------------------------------------
-- 主机:                           localhost
-- 服务器版本:                        5.7.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 coco 的数据库结构
CREATE DATABASE IF NOT EXISTS `coco` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `coco`;

-- 导出  表 coco.goods 结构
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品名称',
  `type` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品类型',
  `pic` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品图片',
  `medium_price` float NOT NULL COMMENT '中杯价格',
  `big_price` float NOT NULL COMMENT '大杯价格',
  `sugar` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '糖量',
  `specifications` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '可选规格',
  `temperature` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '可选温度',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
  `on_sale` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否已上架(0/1)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  coco.goods 的数据：12 rows
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
REPLACE INTO `goods` (`id`, `name`, `type`, `pic`, `medium_price`, `big_price`, `sugar`, `specifications`, `temperature`, `create_time`, `on_sale`) VALUES
	(4, '椰果奶茶', '奶茶', '1628334825.png', 11, 13, '常规糖,无糖', '中杯,大杯', '常规冰,少冰,去冰,温,热', '2021-08-07 19:14:06', 1),
	(5, '红果小姐姐', '果茶', '1628334880.png', 17, 17, '常规糖,无糖', '大杯', '常规冰,少冰,去冰', '2021-08-07 19:14:56', 1),
	(6, '美式咖啡', '咖啡', '1628334906.png', 14, 17, '常规糖,无糖', '中杯,大杯', '常规冰,少冰,去冰', '2021-08-07 19:15:17', 1),
	(7, '珍珠奶茶', '奶茶', '1628336784.png', 12, 14, '常规糖,无糖', '中杯,大杯', '常规冰,少冰,去冰,温,热', '2021-08-07 19:46:39', 1),
	(8, '大红袍珍珠奶茶', '奶茶', '1628420779.png', 13, 15, '常规糖,无糖', '中杯,大杯', '常规冰,少冰,去冰,温,热', '2021-08-08 19:06:39', 1),
	(9, '拿铁', '咖啡', '1628420862.png', 15, 18, '多糖,常规糖,少糖,无糖', '中杯,大杯', '常规冰,多冰,少冰,去冰,温,热', '2021-08-08 19:08:03', 1),
	(10, '卡布奇诺', '咖啡', '1628420896.png', 15, 18, '多糖,常规糖,少糖,无糖', '中杯,大杯', '常规冰,多冰,少冰,去冰,温,热', '2021-08-08 19:08:33', 1),
	(11, '奶茶三兄弟', '奶茶', '1628420949.png', 11, 13, '常规糖,无糖', '中杯,大杯', '常规冰,少冰,去冰,温,热', '2021-08-08 19:09:31', 1),
	(12, '杨枝甘露', '果茶', '1628420987.png', 13, 16, '常规糖,无糖', '大杯', '常规冰,少冰,去冰', '2021-08-08 19:10:09', 1),
	(13, '红豆奶茶', '奶茶', '1628421048.png', 11, 13, '常规糖,无糖', '中杯,大杯', '常规冰,去冰,温,热', '2021-08-08 19:11:01', 1),
	(14, '柠檬水', '果茶', '1628421100.png', 6, 9, '常规糖,无糖', '中杯,大杯', '常规冰,多冰,少冰,去冰', '2021-08-09 19:29:05', 1),
	(16, '青稞牛奶', '牛奶', '1628573620.png', 8, 10, '常规糖,少糖,无糖', '中杯,大杯', '常规冰,少冰,去冰,温,热', '2021-08-11 10:33:45', 1);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;

-- 导出  表 coco.goods_type 结构
CREATE TABLE IF NOT EXISTS `goods_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品类型',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  coco.goods_type 的数据：4 rows
/*!40000 ALTER TABLE `goods_type` DISABLE KEYS */;
REPLACE INTO `goods_type` (`id`, `type`, `create_time`) VALUES
	(4, '奶茶', '2021-08-10 12:46:34'),
	(10, '果茶', '2021-08-10 12:53:37'),
	(3, '咖啡', '2021-08-10 11:33:51'),
	(5, '牛奶', '2021-08-10 12:46:49');
/*!40000 ALTER TABLE `goods_type` ENABLE KEYS */;

-- 导出  表 coco.orders 结构
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL COMMENT '商品id',
  `goods_name` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品名称',
  `goods_type` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品类型',
  `cup` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品杯量',
  `sugar` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '糖量',
  `temperature` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '温度',
  `money` int(11) NOT NULL COMMENT '商品价格',
  `remark` char(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '备注',
  `completed` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否已完成(0/1)',
  `number` tinyint(4) NOT NULL COMMENT '下单数量',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '下单时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  coco.orders 的数据：6 rows
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
REPLACE INTO `orders` (`id`, `goods_id`, `goods_name`, `goods_type`, `cup`, `sugar`, `temperature`, `money`, `remark`, `completed`, `number`, `create_time`) VALUES
	(1, 4, '椰果奶茶', '奶茶', '中杯', '常规糖', '常规冰', 11, '不加葱姜蒜', 0, 1, '2021-08-10 17:08:51'),
	(2, 5, '红果小姐姐', '果茶', '大杯', '常规糖', '少冰', 17, '', 0, 1, '2021-08-10 20:10:07'),
	(3, 4, '椰果奶茶', '奶茶', '大杯', '无糖', '常规冰', 13, '', 0, 1, '2021-08-10 20:12:22'),
	(4, 6, '美式咖啡', '咖啡', '中杯', '常规糖', '常规冰', 14, '', 0, 1, '2021-08-10 20:12:54'),
	(5, 6, '美式咖啡', '咖啡', '中杯', '常规糖', '常规冰', 14, '加冰', 0, 1, '2021-08-10 20:13:41'),
	(6, 6, '美式咖啡', '咖啡', '大杯', '常规糖', '常规冰', 17, '', 0, 2, '2021-08-11 11:38:55');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- 导出  表 coco.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `password` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `admin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否是管理员(0/1)',
  `power` json DEFAULT NULL COMMENT '权限',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  coco.user 的数据：10 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `username`, `password`, `admin`, `power`) VALUES
	(1, 'admin', 'admin', 1, NULL),
	(5, '店长啊', 'admin', 3, NULL),
	(3, 'staff', 'admin', 3, NULL),
	(6, 'admins', 'admin', 2, NULL),
	(7, '店长', 'admin', 2, NULL),
	(8, '店长大哥', 'admin', 2, NULL),
	(9, 'admin啊啊啊', 'admin', 2, NULL),
	(10, 'admindadd', 'admin', 3, NULL),
	(11, 'admin啥大事发生发生', 'admin', 3, NULL),
	(12, 'admin大苏打撒旦', 'admin', 3, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
